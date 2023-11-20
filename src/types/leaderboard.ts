import { z } from "zod";

import { leaderboardUserSchema } from "@/validations/leaderboard";

export type LeaderboardUser = z.infer<typeof leaderboardUserSchema>;
