import { z } from "zod";

import { checkoutSchema, productSchema, productsSchema } from "@/validations/paypal";

export type IProduct = z.infer<typeof productSchema>;

export type IProducts = z.infer<typeof productsSchema>;

export type ICheckoutSession = z.infer<typeof checkoutSchema>;
