export interface SignUpParamsInterface {
  isBuyer?: boolean;
  email: string,
  password: string,
  name: string,
}

export const signup = async (params?: SignUpParamsInterface) => {

  await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'content-type': 'application/json' }
  }).then((res) => window.location.reload()).catch(console.error)

};
