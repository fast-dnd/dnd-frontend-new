import { z } from "zod";

import { DungeonDuration, dungeonDurationsArray } from "@/utils/dungeon-options";

import { championSchema } from "./dungeon";

export const gameStateSchema = z.enum(["CREATING", "GAMING", "CLOSED"]);

export const playerSchema = z.object({
  accountId: z.string(),
  avatarId: z.string(),
  avatarImageUrl: z.string(),
  name: z.string(),
  champion: championSchema.extend({ label: z.string().optional() }).nullish(),
});

export const roomSchema = z.object({
  conversationId: z.string(),
  link: z.string(),
  player: playerSchema.nullish(),
  admin: playerSchema.nullish(),
});

export const roomDataSchema = z.object({
  state: gameStateSchema,
  playerState: z.array(playerSchema),
  dungeonId: z.string(),
  link: z.string(),
  generateImages: z.boolean(),
  generateAudio: z.boolean(),
  responseDetailsDepth: z.enum(dungeonDurationsArray),
  maxPlayers: z.number(),
  maxRounds: z.number(),
});

export const roomArrayElementSchema = z.object({
  state: gameStateSchema,
  turn: z.number(),
  dungeon: z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string(),
  }),
  avatar: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
  }),
  conversationId: z.string(),
});

export const roomArraySchema = z.object({
  rooms: z.array(roomArrayElementSchema),
});

export type IPlayer = z.infer<typeof playerSchema>;

export type IRoom = z.infer<typeof roomSchema>;

export type IRoomData = z.infer<typeof roomDataSchema>;

export type IRoomArrayElement = z.infer<typeof roomArrayElementSchema>;

export type IRoomArray = z.infer<typeof roomArraySchema>;

export interface ICreateRoom {
  generateImages: boolean;
  generateAudio: boolean;
  templateSentences?: string;
  dungeon?: string;
}

export interface IEditRoom {
  conversationId: string;
  responseDetailsDepth?: DungeonDuration;
  generateImages?: boolean;
  generateAudio?: boolean;
}

export interface IEditChampion {
  conversationId: string;
  championId: string;
}

export interface IEditAvatar {
  conversationId: string;
  avatarId: string;
}
