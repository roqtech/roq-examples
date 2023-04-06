import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  ORIGIN: Joi.string().default('*'),
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(3000),
  SECRET_KEY: Joi.string().default('secretKey'),
  LOG_FORMAT: Joi.string().default('dev'),
  LOG_DIR: Joi.string().default('../logs'),
  CREDENTIALS: Joi
    .boolean()
    .optional()
    .default(true),
  ROQ_AUTH_SCOPE: Joi.string().default('openid profile email'),
  ROQ_AUTH_RESPONSE_TYPE: Joi.string().default('code'),
  ROQ_AUTH_RESPONSE_MODE: Joi.string().optional().default('form_post'),
  ROQ_BASE_URL: Joi.string().required('ROQ_BASE_URL is a required variable').default('http://localhost:3000'),
  ROQ_CLIENT_ID: Joi.string().required('ROQ_CLIENT_ID is a required variable'),
  ROQ_CLIENT_SECRET: Joi.string().required('ROQ_CLIENT_SECRETis a required variable'),
  ROQ_ENVIRONMENT_ID: Joi.string().required('ROQ_ENVIRONMENT_ID a required variable'),
  ROQ_API_KEY: Joi.string().required(),
  ROQ_SECRET: Joi.string().required('ROQ_SECRET is a required variable').default('CHANGE_THIS_SECRET'),
  ROQ_PLATFORM_URL: Joi.string().required('ROQ_PLATFORM_URL is a required variable'),
  ROQ_AUTH_CALLBACK_URL: Joi.string().required().default('http://localhost:3000/api/auth/callback'),
  ROQ_AUTH_LOGIN_URL: Joi.string().required().default('http://localhost:3000/api/auth/login'),
  ROQ_AUTH_LOGOUT_URL: Joi.string().required().default('http://localhost:3000/api/auth/logout'),
  ROQ_AUTH_URL: Joi.string().required(),
})