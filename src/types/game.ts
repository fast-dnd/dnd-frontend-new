import { IChampion } from "./dungeon";

export interface IQuestion {
  playerName: string;
  playerChampion: string;
  playerAccountId: string;
  question: string;
  bob3Answer?: string;
}

export interface IMove {
  playerAccountId: string;
  action: string;
  aiDescription: string;
  aiRating: number;
  dice: number;
  mana: number;
  moveType: MoveType;
  playerChampion: string;
  playerName: string;
}

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

export interface IPlayer {
  name: string;
  accountId: string;
  avatarId: string;
  champion: IChampion;
  health: number;
  mana: number;
  gold: number;
  bonusForNextRound: number;
  played?: boolean;
  avatarImageUrl: string;
}

export const defaultMoves = [
  "discover_health",
  "discover_mana",
  "conversation_with_team",
  "rest",
] as const;
export type DefaultMove = (typeof defaultMoves)[number];

export type MoveType = "no_input" | "free_will" | DefaultMove;
