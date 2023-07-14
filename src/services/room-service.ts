import {
  ICreateRoom,
  IEditAvatar,
  IEditChampion,
  IEditRoom,
  IRoom,
  IRoomArrayElement,
  IRoomData,
} from "@/types/room";

import createApi from "./api-factory";

const roomApi = createApi({ commonPrefix: "rooms" });

const createRoom = async (data: ICreateRoom) => {
  return await roomApi.post<IRoom>("", data);
};

const joinRoom = async (data: { link: string }) => {
  return await roomApi.post<IRoom>("join", data);
};

const editRoom = async (data: IEditRoom) => {
  return await roomApi.patch<IRoom>(data.conversationId, data);
};

const getRoomData = async (conversationId: string) => {
  return await roomApi.get<IRoomData>(conversationId).then((res) => res.data);
};

const getRooms = async () => {
  return await roomApi.get<{ rooms: IRoomArrayElement[] }>("").then((res) => res.data);
};

const startGame = async (data: { conversationId: string }) => {
  return await roomApi.post("start", data);
};

const editChampion = async (data: IEditChampion) => {
  return await roomApi.put("player/champion/edit", data);
};

const editAvatar = async (data: IEditAvatar) => {
  return await roomApi.put("player/avatar/edit", data);
};

const roomService = {
  createRoom,
  joinRoom,
  editRoom,
  getRoomData,
  getRooms,
  startGame,
  editChampion,
  editAvatar,
};

export default roomService;

export const roomKey = "rooms";
