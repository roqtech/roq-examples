import * as yup from "yup";

export const clientConfig = Object.freeze({
  roq: {
    platformURL: yup
      .string()
      .trim()
      .required("REACT_APP_ROQ_PLATFORM_URL is a required variable")
      .validateSync(process.env.REACT_APP_ROQ_PLATFORM_URL),
    serverUrl: yup
      .string()
      .trim()
      .required("SERVER URL is a required variable")
      .validateSync(process.env.REACT_APP_SERVER_URL),
  },
});
