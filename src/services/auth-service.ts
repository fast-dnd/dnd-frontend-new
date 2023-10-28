import createApi from "./api-factory";

const authApi = createApi({ commonPrefix: "auth" });

const login = async (data: { credential?: string }) => {
  return await authApi.post<{ jwtToken: string }>("google/login", data).then();
};

const solanaLogin = async (data: { credential?: string }) => {
  return await authApi.post<{ jwtToken: string }>("solana/login", data).then();
};

const authService = {
  login,
  solanaLogin,
};

export default authService;

export const authKey = "auth";
