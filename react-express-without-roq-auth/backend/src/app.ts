import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { serverConfig } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import session from 'express-session';
import passport from 'passport';
import { LocalStrategy } from '@/strategies';
import UserService from '@services/users.service';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  userService = new UserService();

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = serverConfig.nodeEnv || 'development';
    this.port = serverConfig.port || 3000;

    this.initializeMiddlewares();
    this.initializePassport();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: serverConfig.origin, credentials: serverConfig.credentials }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializePassport() {
    this.app.set('trust proxy', 1);
    this.app.use(
      session({
        secret: serverConfig.secretKey,
        resave: false,
        saveUninitialized: false,
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.use(new LocalStrategy().initialize());
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
      const { password: _, ...rest } = await this.userService.findUserById(id);
      done(null, rest);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
