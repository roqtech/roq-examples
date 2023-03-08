import { NextFunction, Request, Response } from 'express';
import { callbackHandler } from '@roq/expressjs/dist/src/handlers/callback.handler';
import { loginHandler } from '@roq/expressjs/dist/src/handlers/login.handler';
import { signUpHandler } from '@roq/expressjs/dist/src/handlers/signup.handler';
import { logoutHandler } from '@roq/expressjs/dist/src/handlers/logout.handler';
import { serverConfig } from '@config';
import { ConfigInterface } from '@roq/expressjs/dist/src/config';
import { RoqCookieNames, SessionStatuses } from '@roq/expressjs/dist/src/enums';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { ClientSession, RoqAccessTokenPayload, RoqIdTokenPayload } from '@roq/expressjs';
import UserService from '@services/users.service';
import { roqClient } from '@/roq';

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

  async onAuthorize(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { state, action } = req.query;
      let role, sync;
      try {
        const parsed = JSON.parse(Buffer.from(state as string, 'base64').toString());
        role = parsed.role;
        sync = parsed.sync;
      } catch (e) {
        role = 'user';
        sync = 'f';
      }
      const clientSession = AuthController.getSessionData(req);
      if (clientSession) {
        if (action === 'signUp') {
          await this.createLocalUser(clientSession, role as string);
        } else if (action === 'login' && sync === 't') {
          await this.updateUser(clientSession);
        }
      }
      return callbackHandler(AuthController.config, req, res);
    } catch (error) {
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
