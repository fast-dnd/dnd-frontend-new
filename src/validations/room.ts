import { z } from "zod";

import { dungeonDurationsArray } from "@/utils/dungeon/dungeon-options";

import { championSchema } from "./dungeon";

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
  playerChampion: z.string().nullish(),
  moveType: moveTypeSchema,
  action: z.string(),
  dice: z.number(),
  mana: z.number(),
  aiRating: z.number(),
  aiDescription: z.string().nullable(),
});

export const questionSchema = z.object({
  question: z.string(),
  bob3Answer: z.string(),
  playerAccountId: z.string(),
  playerName: z.string(),
  playerChampion: z.string().nullish(),
});

export const playerSchema = z.object({
  accountId: z.string(),
  imageUrl: z.string(),
  champion: championSchema.nullish(),
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
  player: playerSchema.optional(),
  admin: playerSchema.optional(),
});

export const baseRoomSchema = z.object({
  state: gameStateSchema,
  roundEndsAt: z.string().nullish(),
  generateImages: z.boolean(),
  generateAudio: z.boolean(),
  responseDetailsDepth: z.enum(dungeonDurationsArray),
  price: z.number(),
});

export const roomDetailSchema = baseRoomSchema.extend({
  moves: z.array(z.array(moveSchema)).optional(),
  questions3History: z.array(questionSchema.partial()),
  playerState: z.array(playerSchema),
  link: z.string(),
  queuedMoves: z.array(moveSchema),
  currentRound: z.number(),
  chatGptResponses: z.array(z.string()),
  generatedImages: z.array(z.string().nullable()),
  generatedAudio: z.array(z.string()),
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

export const getStartGameTxSchema = z.object({
  transaction: z.string(),
});
