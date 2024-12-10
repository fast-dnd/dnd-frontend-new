import { IPlayerMove } from "@/types/game";
import { IReward } from "@/types/reward";
import { IPlayer, IRoomDetail } from "@/types/room";

export type IGameplaySocketEvent = ISocketEvent | IChunkEvent;
export type IGeneralSocketEvent =
  | ISocketEvent
  | IPlayerMoveEvent
  | IQuestionEvent
  | IAsciiMovieEvent;

export interface ISocketEvent {
  event: "REQUEST_SENT_TO_DM" | "ROUND_STORY" | "GAME_ENDED";
  data: IRoomDetail;
}

export interface IPlayerMoveEvent {
  event: "PLAYER_MOVE";
  data: IPlayerMove;
}

export interface IChunkEvent {
  event: "ROUND_STORY_CHUNK";
  data: { chunk: string };
}

export interface IAskEvent {
  event: "PLAYER_ASKED_QUESTION";
  data: { accountId: string; question: string; player: IPlayer };
}

export interface IAnswerEvent {
  event: "DM_ANSWERED_QUESTION";
  data: { question: string; answer: string };
}

export interface IRewardEvent {
  event: "REWARD_EARNED";
  data: { accountId: string; player: IPlayer; reward: IReward };
}

export interface IAsciiMovieEvent {
  event: "ASCII_MOVIE_CHUNK";
  data: {
    asciiChunk: Array<string>;
  };
}

export type IQuestionEvent = IAskEvent | IAnswerEvent;
