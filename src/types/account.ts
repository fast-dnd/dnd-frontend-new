import { z } from "zod";

import {
  accountSchema,
  couponSchema,
  leaderboardMetricsSchema,
  profileSchema,
  statisticsSchema,
} from "@/validations/account";

export type IAccount = z.infer<typeof accountSchema>;

export type IStatistics = z.infer<typeof statisticsSchema>;

export type ILeaderboardMetrics = z.infer<typeof leaderboardMetricsSchema>;

export type IProfile = z.infer<typeof profileSchema>;

export type ICoupon = z.infer<typeof couponSchema>;
