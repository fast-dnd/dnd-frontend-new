import { z } from "zod";

export const accountSchema = z.object({
  _id: z.string(),
  username: z.string(),
  imageUrl: z.string(),
  level: z.number(),
  loginId: z.string(),
  loginType: z.string(),
  properties: z.object({
    email: z.string(),
  }),
  favouriteDungeons: z.array(z.string()),
  favouriteCampaigns: z.array(z.string()),
  rewards: z.array(
    z.object({
      rid: z.string(),
      count: z.number(),
    }),
  ),
  dmCurrency: z.number(),
  coins: z.number(),
});

export const statisticsSchema = z.object({
  createdAdventuresCount: z.number(),
  createdCampaignsCount: z.number(),
  averageAdventureRating: z.number(),
  totalAdventureRatings: z.number(),
  totalAdventurePlayers: z.number(),
  totalCoins: z.number(),
  totalDmCoinsEarned: z.number(),
  totalGamesPlayed: z.number(),
  totalGameplayHours: z.number(),
});

export const leaderboardMetricsSchema = z.object({
  _id: z.string(),
  communityId: z.string(),
  accountId: z.string(),
  rating: z.object({
    gameplay: z.number(),
    influencer: z.number(),
    contentCreation: z.number(),
  }),
  ranking: z.object({
    gameplay: z.number(),
    influencer: z.number(),
    contentCreation: z.number(),
  }),
});

export const profileSchema = z.object({
  account: accountSchema,
  statistics: statisticsSchema,
});

export const couponSchema = z.object({
  message: z.string(),
});
