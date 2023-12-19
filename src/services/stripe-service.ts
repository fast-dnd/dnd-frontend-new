import { checkoutSessionSchema, productsSchema } from "@/validations/stripe";

import createApi from "./api-factory";

const stripeApi = createApi({ commonPrefix: "stripe" });

const getProducts = async () => {
  return await stripeApi.get("products").then((res) => productsSchema.parse(res.data));
};

const createCheckoutSession = async (data: { priceId: string; quantity?: number }) => {
  return await stripeApi
    .post("create-checkout-session", data)
    .then((res) => checkoutSessionSchema.parse(res.data));
};

const stripeService = {
  getProducts,
  createCheckoutSession,
};

export default stripeService;

export const stripeKey = "stripe";
