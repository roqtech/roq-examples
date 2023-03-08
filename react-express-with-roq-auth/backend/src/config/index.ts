import { config } from 'dotenv';
import * as yup from 'yup';
import * as process from 'process';

config();

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;

export interface ServerConfigInterface {
  origin: string;
  nodeEnv: string;
  port: number;
  secretKey: string;
  logFormat: string;
  logDir: string;
  credentials: boolean;
  roq: {
    baseURL: string;
    clientId: string;
    clientSecret: string;
    environmentId: string;
    apiKey: string;
    platformURL: string;
    authURL: string;
    loginURL: string;
    logoutURL: string;
    authSecret: string;
    authorizationParams: {
      response_type: any;
      redirect_uri: string;
      response_mode: string;
      scope: string;
    };
  };
}

// will be cut out by webpack on client side
export const serverConfig: ServerConfigInterface = Object.freeze({
  origin: yup.string().optional().default('*').validateSync(process.env.ORIGIN),
  nodeEnv: yup.string().optional().default('development').validateSync(process.env.NODE_ENV),
  port: yup.number().optional().default(3000).validateSync(process.env.PORT),
  secretKey: yup.string().optional().default('secretKey').validateSync(process.env.SECRET_KEY),
  logFormat: yup.string().optional().default('dev').validateSync(process.env.LOG_FORMAT),
  logDir: yup.string().optional().default('../logs').validateSync(process.env.LOG_DIR),
  credentials: yup
    .boolean()
    .optional()
    .default(true)
    .validateSync(process.env.CREDENTIALS === 'true'),
  roq: {
    authorizationParams: {
      scope: yup.mixed().default('openid profile email').validateSync(process.env.ROQ_AUTH_SCOPE),
      response_type: yup
        .mixed()
        .optional()
        .oneOf(['id_token', 'code id_token', 'code'])
        .default('code')
        .validateSync(process.env.ROQ_AUTH_RESPONSE_TYPE),
      redirect_uri: yup.string().default('/api/auth/callback').validateSync(process.env.ROQ_AUTH_CALLBACK_URL),
      response_mode: yup
        .mixed()
        .optional()
        .when('response_type', {
          is: 'code',
          then: yup.string().oneOf(['query', 'form_post']),
          otherwise: yup.string().oneOf(['form_post']).default('form_post'),
        })
        .validateSync(process.env.ROQ_AUTH_RESPONSE_MODE),
    },
    baseURL: yup.string().required('ROQ_BASE_URL is a required variable').default('http://localhost:3000').validateSync(process.env.ROQ_BASE_URL),
    clientId: yup.string().required('ROQ_CLIENT_ID is a required variable').validateSync(process.env.ROQ_CLIENT_ID),
    clientSecret: yup.string().required('ROQ_CLIENT_SECRETis a required variable').validateSync(process.env.ROQ_CLIENT_SECRET),
    environmentId: yup.string().required('ROQ_ENVIRONMENT_ID a required variable').validateSync(process.env.ROQ_ENVIRONMENT_ID),
    apiKey: yup.string().required().validateSync(process.env.ROQ_API_KEY),
    authSecret: yup.string().required('ROQ_SECRET is a required variable').default('CHANGE_THIS_SECRET').validateSync(process.env.ROQ_SECRET),
    platformURL: yup.string().required('ROQ_PLATFORM_URL is a required variable').validateSync(process.env.ROQ_PLATFORM_URL),
    callbackURL: yup.string().required().default('http://localhost:3000/api/auth/callback').validateSync(process.env.ROQ_AUTH_CALLBACK_URL),
    loginURL: yup.string().required().default('http://localhost:3000/api/auth/login').validateSync(process.env.ROQ_AUTH_LOGIN_URL),
    logoutURL: yup.string().required().default('http://localhost:3000/api/auth/logout').validateSync(process.env.ROQ_AUTH_LOGOUT_URL),
    authURL: yup.string().required().validateSync(process.env.ROQ_AUTH_URL),
  },
});
