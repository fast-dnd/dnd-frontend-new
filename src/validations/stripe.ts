import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  default_price: z.string(),
  name: z.string(),
});

export const productsSchema = z.object({
  products: z.array(productSchema),
});

export const checkoutSessionSchema = z.object({
  session: z.object({
    url: z.string(),
  }),
});
