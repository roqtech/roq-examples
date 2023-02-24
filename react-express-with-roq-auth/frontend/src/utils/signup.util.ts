export interface SignUpParamsInterface {
  isBuyer?: boolean;
}

export const signup = (params?: SignUpParamsInterface) => {
  const signupUrl = new URL(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/signup"
  );

  if (params.isBuyer) {
    signupUrl.searchParams.set("role", "buyer");
  }

  if (typeof window !== "undefined") {
    window.location.href = signupUrl.toString();
  }
};
