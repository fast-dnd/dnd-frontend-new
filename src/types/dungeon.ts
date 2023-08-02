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
  label: z.string().optional(),
});

const baseDungeonSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  recommendedResponseDetailsDepth: z.enum(dungeonDurationsArray),
  tags: z.array(z.enum(dungeonTags)),
  maxPlayers: z.number(),
  imageUrl: z.string(),
});

export const dungeonSchema = baseDungeonSchema.extend({
  locations: z.array(z.string()),
  champions: z.array(z.string()),
  rating: z.number(),
  numOfRatings: z.number(),
});

export const dungeonDetailSchema = baseDungeonSchema.extend({
  locations: z.array(locationSchema),
  champions: z.array(championSchema),
  realityLevel: z.number().min(0).max(100),
  actionLevel: z.number().min(0).max(100),
  misteryLevel: z.number().min(0).max(100),
});

export const rateDungeonSchema = z.object({
  dungeonId: z.string(),
  rating: z.number().min(0).max(5),
  roomId: z.string(),
});

export const campaignSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  imageUrl: z.string(),
  description: z.string().optional(),
  dungeons: z.array(z.string()),
});

export const campaignDetailSchema = campaignSchema.extend({
  dungeons: z.array(baseDungeonSchema),
});

export const campaignForBackendSchema = campaignSchema.omit({ _id: true, imageUrl: true }).extend({
  image: z.string().optional(),
});

export const dungeonsSchema = z.array(dungeonSchema);

export const campaignsSchema = z.array(campaignSchema);

export type ILocation = z.infer<typeof locationSchema>;

export type IChampion = z.infer<typeof championSchema>;

export type IDungeon = z.infer<typeof dungeonSchema>;

export type IDungeonDetail = z.infer<typeof dungeonDetailSchema>;

export type IRateDungeon = z.infer<typeof rateDungeonSchema>;

export type ICampaign = z.infer<typeof campaignSchema>;

export type ICampaignForBackend = z.infer<typeof campaignForBackendSchema>;

export type ICampaignDetail = z.infer<typeof campaignDetailSchema>;
