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
  conversation_with_team: z.string(),
  discover_health: z.string(),
  discover_mana: z.string(),
  // free_will: z.string(),
  // no_input: z.string(),
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
  imageUrl: z.string().optional(),
  rating: z.number(),
  numOfRatings: z.number(),
});

export const dungeonSchema = baseDungeonSchema.extend({
  locations: z.array(z.string()),
  champions: z.array(z.string()),
});

export const dungeonDetailSchema = baseDungeonSchema.extend({
  locations: z.array(locationSchema),
  champions: z.array(championSchema),
  realityLevel: z.number().min(0).max(100),
  actionLevel: z.number().min(0).max(100),
  misteryLevel: z.number().min(0).max(100),
  backgroundUrl: z.string(),
});

export const rateDungeonSchema = z.object({
  dungeonId: z.string(),
  rating: z.number().min(0).max(5),
  roomId: z.string(),
});

export const dungeonsSchema = z.object({
  dungeons: z.array(dungeonSchema),
  total: z.number(),
});

export type ILocation = z.infer<typeof locationSchema>;

export type IChampion = z.infer<typeof championSchema>;

export type IDungeon = z.infer<typeof dungeonSchema>;

export type IDungeonDetail = z.infer<typeof dungeonDetailSchema>;

export type IRateDungeon = z.infer<typeof rateDungeonSchema>;

export type IMoveMapping = z.infer<typeof moveMappingSchema>;
