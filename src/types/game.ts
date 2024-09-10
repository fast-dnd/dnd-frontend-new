import { z } from "zod";

import { playMoveResponseSchema } from "@/validations/game";

export type IPlayMoveResponse = z.infer<typeof playMoveResponseSchema>;

export interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  message?: string;
}
export interface IPlayerMove {
  accountId: string;
  message: string;
  dice: number;
  aiRating: number;
  aiDescriptionForRating: string;
}
