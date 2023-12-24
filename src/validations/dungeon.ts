import { z } from "zod";

import { dungeonDurationsArray, dungeonTags } from "@/utils/dungeon/dungeon-options";

import { rewardSchema } from "./reward";

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
  rest: z.string(),
});

export const championSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["standard", "nft"]),
  moveMapping: moveMappingSchema,
  label: z.string().optional(),
  imageUrl: z.string().nullish(),
  link: z.string().nullish(),
});

export const baseDungeonSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  recommendedResponseDetailsDepth: z.enum(dungeonDurationsArray),
  tags: z.array(z.enum(dungeonTags)),
  maxPlayers: z.number(),
  imageUrl: z.string().optional(),
  rating: z.number(),
  numOfRatings: z.number(),
  createdBy: z
    .object({
      username: z.string(),
      imageUrl: z.string(),
    })
    .nullish(),
  publiclySeen: z.boolean(),
  background: rewardSchema.nullable(),
  type: z.enum(["standard", "nft"]),
  communityId: z.string().optional(),
  creatorWalletAddress: z.string().nullish(),
  transaction: z.string().optional(),
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
  adventureTreasuryAddress: z.string().optional(),
});

export const dungeonForBackendSchema = dungeonDetailSchema
  .omit({
    numOfRatings: true,
    rating: true,
    imageUrl: true,
  })
  .extend({
    background: z.string().nullable(),
    image: z.string().optional(),
  });

export const dungeonTxResponseSchema = z.object({
  transaction: z.string(),
});

export const dungeonResponseSchema = z.object({
  id: z.string(),
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
