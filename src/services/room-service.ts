import {
  ICreateRoom,
  IEditAvatar,
  IEditChampion,
  IEditRoom,
  roomArraySchema,
  roomDataSchema,
  roomSchema,
} from "@/types/room";

import createApi from "./api-factory";

const roomApi = createApi({ commonPrefix: "rooms" });

const createRoom = async (data: ICreateRoom) => {
  return await roomApi.post("", data).then((res) => roomSchema.parse(res.data));
};

const joinRoom = async (data: { link: string }) => {
  return await roomApi.post("join", data).then((res) => roomSchema.parse(res.data));
};

const editRoom = async (data: IEditRoom) => {
  return await roomApi.patch(data.conversationId, data);
};

const getRoomData = async (conversationId: string) => {
  return await roomApi.get(conversationId).then((res) => roomDataSchema.parse(res.data));
};

const getRooms = async () => {
  return await roomApi.get("").then((res) => roomArraySchema.parse(res.data));
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
