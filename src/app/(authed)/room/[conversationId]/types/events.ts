import { IRoomData } from "@/services/room-service";

export interface IRoomSocketEvent {
  event: "PLAYER_JOINED_ROOM" | "PLAYER_EDIT" | "REQUEST_SENT_TO_DM" | "GAME_STARTED";
  data: IRoomData;
}