import { z } from "zod";

import { playMoveResponseSchema } from "@/validations/game";

import { IMoveType } from "./room";

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
