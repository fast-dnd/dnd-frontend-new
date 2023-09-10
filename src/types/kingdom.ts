import { z } from "zod";

const rarities = ["bronze", "silver", "gold", "diamond"] as const;

export const avatarSchema = z.object({
  _id: z.string(),
  name: z.string(),
  energy: z.number(),
  level: z.number(),
  kingdomId: z.string(),
  imageUrl: z.string().optional(),
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

export const kingdomSchema = z.object({
  avatars: z.array(avatarSchema),
  name: z.string(),
  gold: z.number(),
  statistics: statisticsSchema,
});

export const rewardSchema = z.object({
  _id: z.string(),
  name: z.string(),
  rarity: z.enum(rarities),
  url: z.string(),
});

export const rewardsSchema = z.array(rewardSchema);

export type IStatistics = z.infer<typeof statisticsSchema>;

export type IAvatar = z.infer<typeof avatarSchema>;

export type IKingdom = z.infer<typeof kingdomSchema>;

export type IReward = z.infer<typeof rewardSchema>;
