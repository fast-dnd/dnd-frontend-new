import { IRoomDetail } from "@/types/room";

export interface IRoomSocketEvent {
  event:
    | "PLAYER_JOINED_ROOM"
    | "PLAYER_EDIT"
    | "REQUEST_SENT_TO_DM"
    | "GAME_STARTED"
    | "ROOM_SETTINGS_CHANGED"
    | "ASCII_MOVIE_CHUNK";
  data: IRoomDetail;
}
