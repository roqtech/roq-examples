import * as yup from 'yup';

export interface ServerConfigInterface {
  roq: {
    baseURL: string;
    environmentId: string;
    apiKey: string;
    platformURL: string;
  };
  auth: {
    secret: string,
    url: string
  },
  databaseUrl: string
}

let serverConfig: ServerConfigInterface;

if (typeof window === "undefined") {
  // will be cut out by webpack on client side
  serverConfig = Object.freeze({
    databaseUrl: yup
        .string()
        .required('DATABASE_URL is a required variable')
        .default('postgresql://roqdev:roqdev@localhost:5436/roqstarter')
        .validateSync(process.env.DATABASE_URL),
    auth: {
      secret: yup
          .string()
          .required('AUTH_SECRET is a required variable')
          .default('CHANGE_THIS_SECRET')
          .validateSync(process.env.AUTH_SECRET),
      url: yup
          .string()
          .required('NEXTAUTH_URL is a required variable')
          .default('http://localhost:3000"')
          .validateSync(process.env.NEXTAUTH_URL),
    },
    roq: {
      baseURL: yup
          .string()
          .required('ROQ_BASE_URL is a required variable')
          .default('http://localhost:3000')
          .validateSync(process.env.ROQ_BASE_URL),
      environmentId: yup
          .string()
          .required('ROQ_ENVIRONMENT_ID a required variable')
          .validateSync(process.env.ROQ_ENVIRONMENT_ID),
      apiKey: yup.string().required().validateSync(process.env.ROQ_API_KEY),
      platformURL: yup
          .string()
          .required('ROQ_PLATFORM_URL is a required variable')
          .validateSync(process.env.ROQ_PLATFORM_URL)
    },
  });
}
export { serverConfig };
