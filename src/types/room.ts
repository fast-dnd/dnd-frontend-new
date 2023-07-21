import { z } from "zod";

import { DungeonDuration, dungeonDurationsArray } from "@/utils/dungeon-options";

import { locationSchema } from "./dungeon";
import { moveSchema, playerSchema, questionSchema } from "./game";

export const gameStateSchema = z.enum(["CREATING", "GAMING", "CLOSED"]);

export const roomSchema = z.object({
  conversationId: z.string(),
  link: z.string(),
  player: playerSchema.nullish(),
  admin: playerSchema.nullish(),
});

export const roomDataSchema = z.object({
  state: gameStateSchema,
  moves: z.array(z.array(moveSchema)),
  playerState: z.array(playerSchema),
  roundEndsAt: z.string().nullable(),
  dungeonId: z.string(),
  link: z.string(),
  queuedMoves: z.array(moveSchema),
  currentRound: z.number(),
  chatGptResponses: z.array(z.string()),
  generatedImages: z.array(z.string().nullable()),
  generateImages: z.boolean(),
  generatedAudio: z.array(z.string()),
  generateAudio: z.boolean(),
  location: locationSchema,
  questions3History: z.array(questionSchema),
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
