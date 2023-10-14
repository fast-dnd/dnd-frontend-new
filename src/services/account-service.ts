import { accountSchema, couponSchema } from "@/validations/account";

import createApi from "./api-factory";

const accountApi = createApi({ commonPrefix: "accounts" });

const getAccount = async () => {
  return await accountApi.get("").then((res) => accountSchema.parse(res.data));
};

const editAccount = async (data: { username: string; image?: string }) => {
  return await accountApi.put("", data);
};

const redeemCoupon = async (data: { code: string }) => {
  return await accountApi.post("coupon", data).then((res) => couponSchema.parse(res.data));
};

const accountService = {
  getAccount,
  editAccount,
  redeemCoupon,
};

export default accountService;

export const accountKey = "accounts";
