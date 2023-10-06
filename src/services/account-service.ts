import { accountSchema } from "@/validations/account";

import createApi from "./api-factory";

const accountApi = createApi({ commonPrefix: "accounts" });

const getAccount = async () => {
  return await accountApi.get("").then((res) => accountSchema.parse(res.data));
};

const editAccount = async (data: { username: string; image?: string }) => {
  return await accountApi.put("", data);
};

const accountService = {
  getAccount,
  editAccount,
};

export default accountService;

export const accountKey = "accounts";
