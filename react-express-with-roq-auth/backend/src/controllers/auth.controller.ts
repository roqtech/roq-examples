import { NextFunction, Request, Response } from 'express';
import { loginHandler } from '@roq/expressjs/dist/src/handlers/login.handler';
import { signUpHandler } from '@roq/expressjs/dist/src/handlers/signup.handler';
import { logoutHandler } from '@roq/expressjs/dist/src/handlers/logout.handler';
import { RoqClient, Session, TokenVerifier } from '@roq/expressjs/dist/src/lib';
import { serverConfig } from '@config';
import { ConfigInterface } from '@roq/expressjs/dist/src/config';
import { RoqCookieNames, SessionStatuses } from '@roq/expressjs/dist/src/enums';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { ClientSession, RoqAccessTokenPayload, RoqAuthTokens, RoqIdTokenPayload } from '@roq/expressjs';
import UserService from '@services/users.service';
import { roqClient } from '@/roq';
import { RoqErrors } from '@roq/expressjs/dist/src/lib/error';
import { serialize } from 'cookie';

export default class AuthController {
  static config: ConfigInterface;
  private userService = new UserService();

  constructor() {
    AuthController.config = {
      secret: serverConfig.roq.authSecret,
      clientId: serverConfig.roq.clientId,
      issuerBaseURL: serverConfig.roq.authURL,
      clientSecret: serverConfig.roq.clientSecret,
      baseURL: serverConfig.roq.baseURL,
      stateExp: 120,
      authorizationParams: {
        scope: serverConfig.roq.authorizationParams.scope,
        response_type: serverConfig.roq.authorizationParams.response_type,
        redirect_uri: serverConfig.roq.authorizationParams.redirect_uri,
        response_mode: serverConfig.roq.authorizationParams.response_mode,
      },
      session: {
        name: RoqCookieNames.sessionToken,
        maxAge: 3600 * 60,
        inactivityTimeout: 3600,
        cookie: {
          httpOnly: true,
          sameSite: 'lax',
        },
      },
      routes: {
        postLoginRedirect: 'http://localhost:3021',
        postLogoutRedirect: 'http://localhost:3021',
      },
    };
  }

  private async createLocalUser({ user: roqUser, roqUserId }: ClientSession, role: string) {
    const type = role || 'user';
    await this.userService.createUser({
      email: roqUser.email,
      roqUserId,
      type,
      password: 'roq4u',
    });
    await roqClient.asSuperAdmin().updateUser({
      id: roqUserId,
      user: {
        // # Todo API Should allow
        // reference: localUser.id,
        customData: {
          type,
        },
      },
    });
    return roqClient.asSuperAdmin().notify({
      notification: {
        key: 'welcome',
        recipients: { userIds: [roqUserId] },
      },
    });
  }

  updateUser({ user: roqUser, roqUserId }: ClientSession) {
    return this.userService.users.upsert({
      where: { roqUserId },
      update: roqUser,
      create: { ...roqUser, roqUserId, password: 'roq4u', email: roqUser.email },
    });
  }

  private async verifyAuthorizeState(req: Request, res: Response, next: NextFunction) {
    const { state, action, authorization_code: code } = req.query;
    const originalState = req.cookies[RoqCookieNames.state];
    if (!originalState) {
      return res.status(401).json(RoqErrors.LOGIN_STATE_INVALID);
    }
    const isStateValid = TokenVerifier.verifyState(originalState, state as string);

    if (!isStateValid) {
      return res.status(401).json(RoqErrors.LOGIN_STATE_INVALID);
    }

    // Get tokens from the token endpoint
    const roqTokens = await RoqClient.getToken(AuthController.config, code as string);

    if (!roqTokens?.accessToken) {
      return res.status(401).json(RoqErrors.AUTH_FAILED);
    }

    const { accessToken, idToken, refreshToken } = roqTokens;

    // Generate a session token -> cookie
    const sessionCookie = Session.createSerializedSessionCookie(AuthController.config, accessToken, idToken, refreshToken);

    // Clear the state and nonce cookies, and set the session cookie
    res.setHeader('set-cookie', [
      serialize(RoqCookieNames.state, '', {
        path: '/',
        maxAge: -1,
      }),
      serialize(RoqCookieNames.nonce, '', {
        path: '/',
        maxAge: -1,
      }),
      sessionCookie,
    ]);
    return roqTokens;
  }

  private parseQuery(state: string): { role: string; sync: string } {
    let role, sync;
    console.log({ state });
    try {
      const parsed = JSON.parse(Buffer.from(state as string, 'base64').toString());
      console.log({ parsed });
      role = parsed.role;
      sync = parsed.sync;
    } catch (e) {
      console.error({ e });
      role = 'user';
      sync = 'f';
    }
    return {
      role,
      sync,
    };
  }

  async onAuthorize(req: Request, res: Response, next: NextFunction) {
    try {
      const { state, action } = req.query;
      const response = await this.verifyAuthorizeState(req, res, next);
      let roqTokens;
      if (!roqTokens?.idToken && !roqTokens?.accessToken) {
        roqTokens = response as RoqAuthTokens;
      }
      const clientSession = AuthController.generateClientSession({
        roqIdToken: roqTokens.idToken,
        roqAccessToken: roqTokens.accessToken,
      });
      const { role, sync } = this.parseQuery(state as string);
      if (action === 'signUp') {
        await this.createLocalUser(clientSession, role as string);
      } else if (action === 'login' && sync === 't') {
        await this.updateUser(clientSession);
      }
      const successUrl = AuthController.config.routes.postLoginRedirect || AuthController.config.baseURL;
      return res.status(302).redirect(successUrl);
    } catch (error) {
      console.error({ error });
      next(error);
    }
  }

  async onLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    return loginHandler(AuthController.config, req, res);
  }

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const redirectUrl = new URL(serverConfig.roq.authorizationParams.redirect_uri);
    return signUpHandler(
      {
        ...AuthController.config,
        authorizationParams: {
          ...AuthController.config.authorizationParams,
          redirect_uri: redirectUrl.pathname,
        },
      },
      req,
      res,
    );
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    return logoutHandler(AuthController.config, req, res);
  }

  static generateClientSession(sessionPayload): ClientSession {
    const idTokenPayload = decode(sessionPayload.roqIdToken || '') as RoqIdTokenPayload;
    const accessTokenPayload = decode(sessionPayload.roqAccessToken || '') as RoqAccessTokenPayload;

    //   Prep session info and return it. ID token data may not always be present
    const { firstName, lastName, email, timezone, locale, roles, tenantId } = idTokenPayload || {};

    const session: ClientSession = {
      id: sessionPayload.id,
      roqAccessToken: sessionPayload.roqAccessToken,
      roqUserId: accessTokenPayload.roqUserId,
      user: {
        firstName,
        lastName,
        email,
        timezone,
        locale,
        roles,
        tenantId,
      },
      iat: sessionPayload.iat,
      exp: sessionPayload.exp,
    };

    return session;
  }

  static getSessionData(req: Request) {
    const sessionToken = req.cookies[RoqCookieNames.sessionToken];

    // Check token exists
    if (!sessionToken) {
      return;
    }
    try {
      const sessionPayload = verify(sessionToken, AuthController.config.secret) as JwtPayload;
      return AuthController.generateClientSession(sessionPayload);
    } catch (e) {
      return;
    }
    //   Prep session info and return it. ID token data may not always be present
  }

  async session(req: Request, res: Response, next: NextFunction) {
    const session = AuthController.getSessionData(req);
    if (!session) {
      console.log('No session token was found');
      return res.status(200).json({ session: null, status: SessionStatuses.unauthenticated });
    }
    return res.status(200).json({ session, status: SessionStatuses.authenticated });
  }
}
