import { z } from "zod";

export const leaderboardUserSchema = z.object({
  rank: z.number(),
  accountId: z.string(),
  username: z.string(),
  imageUrl: z.string(),
  email: z.string(),
  rating: z.number(),
  walletAddress: z.string().optional(),
  transactions: z
    .array(
      z.object({
        txHash: z.string(),
        chain: z.string(),
        createdAt: z.string(),
        rating: z.number(),
      }),
    )
    .optional(),
});

export const leaderboardSchema = z.object({
  leaderboard: z.array(leaderboardUserSchema),
  total: z.number(),
  userRank: z.number().nullable(),
  userRating: z.number().nullable(),
});

export type ILeaderBoard = z.infer<typeof leaderboardSchema>;
