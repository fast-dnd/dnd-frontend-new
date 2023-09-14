import { accountSchema } from "@/types/account";

import createApi from "./api-factory";

const accountApi = createApi({ commonPrefix: "accounts" });

const getAccount = async () => {
  return await accountApi.get("account").then((res) => accountSchema.parse(res.data));
};

const accountService = {
  getAccount,
};

export default accountService;

export const accountKey = "accounts";
