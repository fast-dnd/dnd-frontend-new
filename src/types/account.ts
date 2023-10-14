import { z } from "zod";

import { accountSchema, couponSchema } from "@/validations/account";

export type IAccount = z.infer<typeof accountSchema>;

export type ICoupon = z.infer<typeof couponSchema>;
