import { z } from "zod";

const rarities = ["bronze", "silver", "gold", "diamond"] as const;

export const rewardSchema = z.object({
  _id: z.string(),
  name: z.string(),
  rarity: z.enum(rarities),
  url: z.string(),
});

export const rewardsSchema = z.array(rewardSchema);

export type IReward = z.infer<typeof rewardSchema>;
