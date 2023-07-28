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
  realityLevel: z.number().min(0).max(3).default(0),
  actionLevel: z.number().min(0).max(3).default(0),
  misteryLevel: z.number().min(0).max(3).default(0),
  locations: z.array(locationSchema),
  champions: z.array(championSchema),
});

export const dungeonGetDetailSchema = dungeonDetailSchema.extend({
  rating: z.number().optional(),
  numOfRatings: z.number().optional(),
  timesPlayed: z.number().optional(),
});

export const dungeonsSchema = z.array(dungeonSchema);

export type ILocation = z.infer<typeof locationSchema>;

export type IChampion = z.infer<typeof championSchema>;

export type IDungeon = z.infer<typeof dungeonSchema>;

export type IDungeonDetail = z.infer<typeof dungeonDetailSchema>;

export type IDungeonGetDetail = z.infer<typeof dungeonGetDetailSchema>;
