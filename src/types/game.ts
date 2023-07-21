import { z } from "zod";

import { championSchema } from "./dungeon";

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

export const playerSchema = z.object({
  accountId: z.string(),
  avatarId: z.string(),
  avatarImageUrl: z.string(),
  name: z.string(),
  champion: championSchema.extend({ label: z.string().optional() }).nullish(),
  health: z.number(),
  mana: z.number(),
  gold: z.number(),
});

export const defaultMoveSchema = z.enum(defaultMoves);

export const moveTypeSchema = z.enum([...defaultMoves, "no_input", "free_will"]);

export const moveSchema = z.object({
  playerAccountId: z.string(),
  action: z.string(),
  aiDescription: z.string(),
  aiRating: z.number(),
  dice: z.number(),
  mana: z.number(),
  moveType: moveTypeSchema,
  playerChampion: z.string(),
  playerName: z.string(),
});

export type IQuestion = z.infer<typeof questionSchema>;

export type DefaultMove = z.infer<typeof defaultMoveSchema>;

export type MoveType = z.infer<typeof moveTypeSchema>;

export type IPlayer = z.infer<typeof playerSchema>;

export type IMove = z.infer<typeof moveSchema>;

export interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: MoveType;
  message?: string;
}

export interface IPlayMoveResponse {
  dice: number;
  diceAfterBonus: number;
  diceBreakdown: {
    aiDiceBonus: number;
    bonusApplied: number;
    dice: number;
    mana: number;
  };
}

export interface IPlayerMove {
  accountId: string;
  moveType: MoveType;
  message: string;
  dice: number;
  aiRating: number;
  aiDescriptionForRating: string;
}
