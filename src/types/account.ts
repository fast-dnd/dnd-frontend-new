import { z } from "zod";

import {
  accountSchema,
  couponSchema,
  profileSchema,
  rankingSchema,
  statisticsSchema,
} from "@/validations/account";

export type IAccount = z.infer<typeof accountSchema>;

export type IStatistics = z.infer<typeof statisticsSchema>;

export type IRanking = z.infer<typeof rankingSchema>;

export type IProfile = z.infer<typeof profileSchema>;

export type ICoupon = z.infer<typeof couponSchema>;
