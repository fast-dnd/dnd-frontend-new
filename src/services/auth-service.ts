import { IAccount } from "@/types/dnd";
import createApi from "./api-factory";

const authApi = createApi({});

const login = async (data: { credential?: string }) => {
  return await authApi.post<{ jwtToken: string }>("google/login", data).then((res) => {
    localStorage.setItem("jwtToken", res.data.jwtToken);
  });
};

const account = async () => {
  return await authApi.get<IAccount>("account").then((res) => res.data);
};

const authService = {
  login,
  account,
};
export default authService;
