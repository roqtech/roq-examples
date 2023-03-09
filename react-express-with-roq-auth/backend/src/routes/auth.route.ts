import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AuthController from '@/controllers/auth.controller';
import { auth } from '@roq/expressjs';

class AuthRoute implements Routes {
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  findRoute(path: string) {
    return this.router.stack.find(val => {
      return val?.route?.path === `/api/auth/${path}`;
    });
  }

  private initializeRoutes() {
    this.router = auth();
    const callback = this.findRoute('callback');
    const signUp = this.findRoute('signup');
    const logout = this.findRoute('logout');
    callback.handle = this.authController.onAuthorize.bind(this.authController);
    signUp.handle = this.authController.signup.bind(this.authController);
    logout.handle = this.authController.logout.bind(this.authController);
    // this.router.get(`/api/auth/callback`, callback.handle, this.authController.onAuthorize.bind(this.authController));
    // this.router.get('/api/auth/login', this.authController.onLogin.bind(this.authController));
    // this.router.get('/api/auth/signup', this.authController.signup.bind(this.authController));
    // this.router.get('/api/auth/session', this.authController.session.bind(this.authController));
    // this.router.get('/api/auth/logout', this.authController.logout.bind(this.authController));
  }
}

export default AuthRoute;
