export interface LoginParamsInterface {
  syncDb?: boolean;
}

export const login = (params?: LoginParamsInterface) => {
  const loginUrl = new URL(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/login"
  );

  if (params.syncDb) {
    loginUrl.searchParams.set("sync", "t");
  }

  if (typeof window !== "undefined") {
    window.location.href = loginUrl.toString();
  }
};
