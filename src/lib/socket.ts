import { BACKEND_URL } from "@/services/api-factory";
import { IPlayerMove } from "@/services/dnd-service";
import { IRoomData } from "@/services/room-service";
import { io } from "socket.io-client";

export const socketIO = io(BACKEND_URL);

export type ISocketEvent = IRegularSocketEvent | IPlayerMoveEvent | IChunkEvent | IQuestionEvent;

export interface IRegularSocketEvent {
  event:
    | "PLAYER_JOINED_ROOM"
    | "PLAYER_EDIT"
    | "REQUEST_SENT_TO_DM"
    | "GAME_STARTED"
    | "ROUND_STORY"
    | "GAME_ENDED";
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
