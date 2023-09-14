import { z } from "zod";

import { dungeonSchema } from "./dungeon";

export const campaignSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  imageUrl: z.string(),
  description: z.string().optional(),
  dungeons: z.array(z.string()),
});

export const campaignDetailSchema = campaignSchema.extend({
  dungeons: z.array(dungeonSchema),
});

export const campaignForBackendSchema = campaignSchema.omit({ _id: true, imageUrl: true }).extend({
  image: z.string().optional(),
});

export const campaignsSchema = z.object({
  campaigns: z.array(campaignSchema),
  total: z.number(),
});

export type ICampaign = z.infer<typeof campaignSchema>;

export type ICampaignForBackend = z.infer<typeof campaignForBackendSchema>;

export type ICampaignDetail = z.infer<typeof campaignDetailSchema>;
