import { NextFunction, Response } from 'express';
import UserService from '@services/users.service';
import { roqClient } from '@/roq';
import AuthService from '@services/auth.service';

export default class AuthController {
  private userService = new UserService();
  private authService = new AuthService();

  private async createLocalUser({ email, password, name, customData }) {
    const type = customData?.role || 'user';
    const createdUser = await this.authService.signup({ name, email, password, type, roqUserId: email });

    const [firstName, lastName] = name?.split(' ');
    const { createUser: roqUser } = await roqClient.asSuperAdmin().createUser({
      user: {
        firstName,
        lastName,
        email: createdUser.email,
        active: true,
        locale: 'en-US',
        isOptedIn: true,
        reference: createdUser.id,
      },
    });

    const { password: _, ...rest } = await this.userService.updateUser(createdUser.id, { roqUserId: roqUser.id });

    if (customData) {
      await roqClient.asSuperAdmin().updateUser({
        id: roqUser.id,
        user: {
          customData,
        },
      });
    }

    await roqClient.asSuperAdmin().notify({
      notification: {
        key: 'welcome',
        recipients: { userIds: [roqUser.id] },
      },
    });

    return {
      ...rest,
      roqUserId: roqUser.id,
    };
  }

  updateUser({ email, roqUserId, name }) {
    return this.userService.users.upsert({
      where: { roqUserId },
      update: { email },
      create: { roqUserId, password: 'roq4u', email, name },
    });
  }

  async onLogin(req, res: Response, next: NextFunction): Promise<void> {
    return res.redirect('/');
  }

  getUserToken(roqUserId: string): Promise<string> {
    return roqClient.authorization.createUserToken(roqUserId);
  }

  async signup(req, res: Response, next: NextFunction): Promise<void> {
    try {
      req.user = await this.createLocalUser(req.body);
      req.login(req.user, err => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.redirect('/');
      });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res: Response, next: NextFunction): Promise<void> {
    req.logout(err => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.redirect('/');
    });
  }

  async session(req, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      if (!req.user?.roqAccessToken) {
        req.user.roqAccessToken = await this.getUserToken(req.user.roqUserId);
      }
      return res.status(200).json({ session: req.user, status: 'authenticated' });
    } else {
      return res.status(200).json({ session: null, status: 'unauthenticated' });
    }
  }
}
