import { z } from "zod";

import { championSchema, locationSchema } from "./dungeon";
import { playerSchema, roomDataSchema } from "./room";

export const defaultMoves = [
  "discover_health",
  "discover_mana",
  "conversation_with_team",
  "rest",
] as const;

export const questionSchema = z.object({
  playerName: z.string(),
  playerChampion: z.string(),
  playerAccountId: z.string(),
  question: z.string(),
  bob3Answer: z.string().nullish(),
});

export const gamePlayerSchema = playerSchema.extend({
  champion: championSchema,
  health: z.number(),
  mana: z.number(),
  gold: z.number(),
  bonusForNextRound: z.number(),
});

export const defaultMoveSchema = z.enum(defaultMoves);

export const moveTypeSchema = z.enum([...defaultMoves, "no_input", "free_will"]);

export const moveSchema = z.object({
  playerAccountId: z.string(),
  action: z.string(),
  aiDescription: z.string().nullable(),
  aiRating: z.number(),
  dice: z.number(),
  mana: z.number(),
  moveType: moveTypeSchema,
  playerChampion: z.string(),
  playerName: z.string(),
});

export const gameRoomDataSchema = roomDataSchema.extend({
  playerState: z.array(gamePlayerSchema),
  moves: z.array(z.array(moveSchema)),
  roundEndsAt: z.string().nullable(),
  queuedMoves: z.array(moveSchema),
  currentRound: z.number(),
  chatGptResponses: z.array(z.string()),
  generatedImages: z.array(z.string().nullable()),
  generatedAudio: z.array(z.string()),
  location: locationSchema,
  questions3History: z.array(questionSchema.partial()),
});

export type IQuestion = z.infer<typeof questionSchema>;

export type DefaultMove = z.infer<typeof defaultMoveSchema>;

export type MoveType = z.infer<typeof moveTypeSchema>;

export type IMove = z.infer<typeof moveSchema>;

export type IGamePlayer = z.infer<typeof gamePlayerSchema>;

export type IGameRoomData = z.infer<typeof gameRoomDataSchema>;

export interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: MoveType;
  message?: string;
}

export const diceBreakdownSchema = z.object({
  aiDiceBonus: z.number(),
  bonusApplied: z.number(),
  dice: z.number(),
  mana: z.number(),
});

export const playMoveResponseSchema = z.object({
  dice: z.number(),
  diceAfterBonus: z.number(),
  diceBreakdown: diceBreakdownSchema,
});

export type IPlayMoveResponse = z.infer<typeof playMoveResponseSchema>;

export interface IPlayerMove {
  accountId: string;
  moveType: MoveType;
  message: string;
  dice: number;
  aiRating: number;
  aiDescriptionForRating: string;
}
