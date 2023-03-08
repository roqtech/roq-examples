import { clientConfig } from '../config';

export interface SignUpParamsInterface {
  isBuyer?: boolean;
}

export const signup = async (params?: SignUpParamsInterface) => {
  const signupUrl = new URL(
      clientConfig.roq.serverUrl + '/auth/signup'
  );

  if (params.isBuyer) {
    signupUrl.searchParams.set('role', 'buyer');
  }
  await fetch(signupUrl.toString())
      .then((res) => res.text())

  if (typeof window !== 'undefined') {
    window.location.href = signupUrl.toString();
  }
};
