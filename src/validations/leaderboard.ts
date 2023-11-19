import { z } from "zod";

export const leaderboardUserSchema = z.object({
  rank: z.number(),
  accountId: z.string(),
  username: z.string(),
  imageUrl: z.string(),
  email: z.string(),
  rating: z.number(),
});

export const leaderboardSchema = z.object({
  leaderboard: z.array(leaderboardUserSchema),
  total: z.number(),
});

export type ILeaderBoard = z.infer<typeof leaderboardSchema>;
