import { DungeonDuration } from "@/utils/dungeon-options";

import { ILocation } from "./dungeon";
import { IMove, IPlayer, IQuestion } from "./game";

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

export interface IRoom {
  conversationId: string;
  link: string;
  player?: IPlayer;
  admin?: IPlayer;
}

export interface IRoomData {
  state: "CREATING" | "GAMING" | "CLOSED";
  moves: IMove[][];
  playerState: IPlayer[];
  roundEndsAt: string | null;
  dungeonId: string;
  link: string;
  queuedMoves: IMove[];
  currentRound: number;
  chatGptResponses: string[];
  generatedImages: string[];
  generateImages: boolean;
  generatedAudio: string[];
  generateAudio: string;
  location: ILocation;
  adventureMission: string;
  conversationId: string;
  questions3History: IQuestion[];
  responseDetailsDepth: DungeonDuration;
  maxPlayers: number;
  maxRounds: number;
}

export interface IRoomArrayElement {
  state: "CREATING" | "GAMING" | "CLOSED";
  turn: number;
  dungeon: {
    id: string;
    name: string;
    imageUrl: string;
  };
  avatar: {
    id: string;
    name: string;
    image: string;
  };
  conversationId: string;
  generateAudio: boolean;
  generateImages: boolean;
}

export interface IEditChampion {
  conversationId: string;
  championId: string;
}

export interface IEditAvatar {
  conversationId: string;
  avatarId: string;
}
