import { Strategy } from 'passport-local';
import AuthService from '@services/auth.service';

export class LocalStrategy {
  authService = new AuthService();

  initialize() {
    return new Strategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await this.authService.login({
          email,
          password,
        });
        return done(null, user);
      } catch (e) {
        return done(null, e);
      }
    });
  }
}
