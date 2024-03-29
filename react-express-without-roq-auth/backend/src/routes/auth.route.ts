import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AuthController from '@/controllers/auth.controller';
import passport from 'passport';

class AuthRoute implements Routes {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/api/auth/login', passport.authenticate('local'), this.authController.onLogin.bind(this.authController));
    this.router.post('/api/auth/signup', this.authController.signup.bind(this.authController));
    this.router.get('/api/auth/session', this.authController.session.bind(this.authController));
    this.router.get('/api/auth/logout', this.authController.logout.bind(this.authController));
  }
}

export default AuthRoute;
