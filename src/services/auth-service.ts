import { accountSchema } from "@/types/auth";

import createApi from "./api-factory";

const authApi = createApi({ commonPrefix: "auth" });

const login = async (data: { credential?: string }) => {
  return await authApi.post<{ jwtToken: string }>("google/login", data).then((res) => {
    localStorage.setItem("jwtToken", res.data.jwtToken);
  });
};

const account = async () => {
  return await authApi.get("account").then((res) => accountSchema.parse(res.data));
};

const authService = {
  login,
  account,
};

export default authService;

export const authKey = "auth";
