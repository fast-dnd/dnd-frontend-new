import { checkoutSchema } from "@/validations/paypal";

import createApi from "./api-factory";

const paypalApi = createApi({ commonPrefix: "paypal" });

const createOrder = async (data: { itemName: string }) => {
  return await paypalApi.post("create-order", data).then((res) => checkoutSchema.parse(res.data));
};

const paypalService = {
  createOrder,
};

export default paypalService;

export const paypalKey = "paypal";
