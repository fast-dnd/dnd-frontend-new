import { z } from "zod";

import { checkoutSessionSchema, productSchema, productsSchema } from "@/validations/stripe";

export type IProduct = z.infer<typeof productSchema>;

export type IProducts = z.infer<typeof productsSchema>;

export type ICheckoutSession = z.infer<typeof checkoutSessionSchema>;
