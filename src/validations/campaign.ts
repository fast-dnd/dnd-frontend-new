import { z } from "zod";

import { dungeonSchema } from "./dungeon";

export const campaignSchema = z.object({
  _id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  dungeons: z.array(z.string()),
  createdBy: z
    .object({
      username: z.string(),
      imageUrl: z.string(),
    })
    .nullish(),
  publiclySeen: z.boolean(),
});

export const campaignDetailSchema = campaignSchema.extend({
  dungeons: z.array(dungeonSchema),
});

export const campaignForBackendSchema = campaignSchema.omit({ _id: true, imageUrl: true }).extend({
  image: z.string().optional(),
});

export const campaignResponseSchema = z.object({
  id: z.string(),
});

export const campaignsSchema = z.object({
  campaigns: z.array(campaignSchema),
  total: z.number(),
});
