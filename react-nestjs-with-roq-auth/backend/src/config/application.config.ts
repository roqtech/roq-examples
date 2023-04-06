import { registerAs } from '@nestjs/config';

export const applicationConfig = registerAs('application', () => ({
  origin: process.env.ORIGIN,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  logFormat: process.env.LOG_FORMAT,
  logDir: process.env.LOG_DIR,
  credentials: process.env.CREDENTIALS === 'true',
  roq: {
    authorizationParams: {
      scope: process.env.ROQ_AUTH_SCOPE,
      response_type: process.env.ROQ_AUTH_RESPONSE_TYPE,
      redirect_uri: process.env.ROQ_AUTH_CALLBACK_URL,
      response_mode: process.env.ROQ_AUTH_RESPONSE_MODE,
    },
    baseURL: process.env.ROQ_BASE_URL,
    clientId: process.env.ROQ_CLIENT_ID,
    clientSecret: process.env.ROQ_CLIENT_SECRET,
    environmentId: process.env.ROQ_ENVIRONMENT_ID,
    apiKey: process.env.ROQ_API_KEY,
    authSecret: process.env.ROQ_SECRET,
    platformURL: process.env.ROQ_PLATFORM_URL,
    callbackURL: process.env.ROQ_AUTH_CALLBACK_URL,
    loginURL: process.env.ROQ_AUTH_LOGIN_URL,
    logoutURL: process.env.ROQ_AUTH_LOGOUT_URL,
    authURL: process.env.ROQ_AUTH_URL,
  }
}));