import { z } from "zod";

import { DungeonDuration, dungeonDurationsArray } from "@/utils/dungeon-options";

import { locationSchema, moveMappingSchema } from "./dungeon";

export const gameStateSchema = z.enum(["CREATING", "GAMING", "WIN", "LOSE"]);

export const defaultMoves = [
  "discover_health",
  "discover_mana",
  "conversation_with_team",
  "rest",
] as const;

export const defaultMoveSchema = z.enum(defaultMoves);

export const moveTypeSchema = z.enum([...defaultMoves, "no_input", "free_will"]);

export const moveSchema = z.object({
  playerAccountId: z.string(),
  playerName: z.string(),
  playerChampion: z.string(),
  moveType: moveTypeSchema,
  action: z.string(),
  dice: z.number(),
  mana: z.number(),
  aiRating: z.number(),
  aiDescription: z.string(),
});

export const questionSchema = z.object({
  question: z.string(),
  bob3Answer: z.string(),
  playerAccountId: z.string(),
  playerName: z.string(),
  playerChampion: z.string(),
});

export const playerSchema = z.object({
  accountId: z.string(),
  imageUrl: z.string(),
  champion: z.object({
    name: z.string(),
    description: z.string(),
    moveMapping: moveMappingSchema,
  }),
  bonusForNextRound: z.number(),
  name: z.string(),
  accountLevel: z.number(),
  health: z.number(),
  mana: z.number(),
  gold: z.number(),
});

export const roomSummarySchema = z.object({
  conversationId: z.string(),
  link: z.string(),
  player: playerSchema.nullish(),
  admin: playerSchema.nullish(),
});

export const baseRoomSchema = z.object({
  state: gameStateSchema,
  roundEndsAt: z.string(),
  generateImages: z.boolean(),
  generateAudio: z.boolean(),
  responseDetailsDepth: z.enum(dungeonDurationsArray),
  price: z.number(),
});

export const roomDetailSchema = baseRoomSchema.extend({
  moves: z.array(moveSchema),
  questions3History: z.array(questionSchema),
  players: z.array(playerSchema),
  link: z.string(),
  queuedMoves: z.array(moveSchema),
  currentRound: z.number(),
  chatGptResponses: z.array(z.string()),
  generatedImages: z.array(z.string().nullable()),
  generatedAudio: z.array(z.string()),
  location: locationSchema,
  dungeonId: z.string(),
  maxPlayers: z.number(),
  maxRounds: z.number(),
});

export const roomSchema = baseRoomSchema.extend({
  dungeon: z.object({
    id: z.string(),
    name: z.string(),
    imageUrl: z.string(),
  }),
  turn: z.number(),
  conversationId: z.string(),
});

export const roomHistorySchema = z.object({
  rooms: z.array(roomSchema),
  total: z.number(),
});

export type IMoveType = z.infer<typeof moveTypeSchema>;

export type IPlayer = z.infer<typeof playerSchema>;

export type IRoomSummary = z.infer<typeof roomSummarySchema>;

export type IRoom = z.infer<typeof roomSchema>;

export type IRoomDetail = z.infer<typeof roomDetailSchema>;

export type IRoomArrayElement = z.infer<typeof roomSummarySchema>;

export type IRoomArray = z.infer<typeof roomHistorySchema>;

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
