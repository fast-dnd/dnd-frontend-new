import { z } from "zod";

import { dungeonDurationsArray, dungeonTags } from "@/utils/dungeon-options";

export const locationSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  mission: z.string(),
  transition: z.string(),
});

export const moveMappingSchema = z.object({
  discover_health: z.string(),
  discover_mana: z.string(),
  conversation_with_team: z.string(),
  rest: z.string(),
});

export const championSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  moveMapping: moveMappingSchema,
});

const baseDungeonSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  style: z.string(),
  recommendedResponseDetailsDepth: z.enum(dungeonDurationsArray),
  tags: z.array(z.enum(dungeonTags)),
  maxPlayers: z.number(),
  imageUrl: z.string(),
});

export const dungeonSchema = baseDungeonSchema.extend({
  locations: z.array(z.string()),
  champions: z.array(z.string()),
});

export const dungeonDetailSchema = baseDungeonSchema.extend({
  locations: z.array(locationSchema),
  champions: z.array(championSchema),
});

export const campaignSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  dungeons: z.array(z.string()),
  imageUrl: z.string(),
});

export const campaignDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  dungeons: z.array(baseDungeonSchema),
});

export const dungeonsSchema = z.array(dungeonSchema);

export const campaignsSchema = z.array(campaignSchema);

export type ILocation = z.infer<typeof locationSchema>;

export type IChampion = z.infer<typeof championSchema>;

export type IDungeon = z.infer<typeof dungeonSchema>;

export type IDungeonDetail = z.infer<typeof dungeonDetailSchema>;

export type ICampaign = z.infer<typeof campaignSchema>;

export type ICampaignDetail = z.infer<typeof campaignDetailSchema>;
