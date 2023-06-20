import { IPlayerMove } from "@/services/dnd-service";
import { IRoomData } from "@/services/room-service";

export type IGameplaySocketEvent = ISocketEvent | IChunkEvent;
export type IGeneralSocketEvent = IPlayerMoveEvent | IQuestionEvent;

export interface ISocketEvent {
  event: "REQUEST_SENT_TO_DM" | "ROUND_STORY" | "GAME_ENDED";
  data: IRoomData;
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
  data: { accountId: string; question: string };
}

export interface IAnswerEvent {
  event: "DM_ANSWERED_QUESTION";
  data: { question: string; answer: string };
}

export type IQuestionEvent = IAskEvent | IAnswerEvent;
