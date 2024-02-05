import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  default_price: z.string(),
  name: z.string(),
});

export const productsSchema = z.object({
  products: z.array(productSchema),
});

export const checkoutSchema = z.object({
  redirectUrl: z.string(),
});
