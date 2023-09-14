import { z } from "zod";

import { IMoveType } from "./room";

export const diceBreakdownSchema = z.object({
  dice: z.number(),
  mana: z.number(),
  bonusApplied: z.number(),
  aiDiceBonus: z.number(),
});

export const playMoveResponseSchema = z.object({
  dice: z.number(),
  diceAfterBonus: z.number(),
  diceBreakdown: diceBreakdownSchema,
});

export type IPlayMoveResponse = z.infer<typeof playMoveResponseSchema>;

export interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: IMoveType;
  message?: string;
}
export interface IPlayerMove {
  accountId: string;
  moveType: IMoveType;
  message: string;
  dice: number;
  aiRating: number;
  aiDescriptionForRating: string;
}
