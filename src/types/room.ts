import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

import { DungeonDuration } from "@/utils/dungeon-options";
import {
  defaultMoveSchema,
  gameStateSchema,
  moveSchema,
  moveTypeSchema,
  playerSchema,
  questionSchema,
  roomDetailSchema,
  roomHistorySchema,
  roomSchema,
  roomSummarySchema,
} from "@/validations/room";

export type IGameState = z.infer<typeof gameStateSchema>;

export type IDefaultMove = z.infer<typeof defaultMoveSchema>;

export type IMoveType = z.infer<typeof moveTypeSchema>;

export type IMove = z.infer<typeof moveSchema>;

export type IQuestion = z.infer<typeof questionSchema>;

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
  championId: string | undefined;
  signMessage?: string;
  signature?: string;
  walletAddress?: PublicKey;
}
