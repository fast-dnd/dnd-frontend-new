import queryString from "query-string";

import { ICreateRoom, IEditChampion, IEditRoom } from "@/types/room";
import {
  getStartGameTxSchema,
  roomDetailSchema,
  roomHistorySchema,
  roomSummarySchema,
} from "@/validations/room";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const roomApi = createApi({ commonPrefix: "rooms" });

const getRoomHistory = async ({ pageParam }: { pageParam: number }) => {
  const queryParams = queryString.stringify({
    skip: (pageParam - 1) * PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
  });

  return await roomApi
    .get("history?" + queryParams)
    .then((res) => roomHistorySchema.parse(res.data));
};

const getRoomData = async (conversationId: string) => {
  return await roomApi.get(conversationId).then((res) => roomDetailSchema.parse(res.data));
};

const createRoom = async (data: ICreateRoom) => {
  return await roomApi.post("", data).then((res) => roomSummarySchema.parse(res.data));
};

const joinRoom = async (data: { link: string }) => {
  return await roomApi.post("join", data).then((res) => roomSummarySchema.parse(res.data));
};

const editRoom = async (data: IEditRoom) => {
  return await roomApi.patch(data.conversationId, data);
};

const getStartGameTx = async (data: { conversationId: string }) => {
  return await roomApi
    .get(`start-transaction/${data.conversationId}`)
    .then((res) => getStartGameTxSchema.parse(res.data));
};

const startGame = async (data: { conversationId: string; transaction?: string }) => {
  return await roomApi.post("start", data);
};

const editChampion = async (data: IEditChampion) => {
  return await roomApi.put("player/champion/edit", data).then((res) => res.data);
};

const roomService = {
  getRoomHistory,
  getRoomData,
  createRoom,
  joinRoom,
  editRoom,
  getStartGameTx,
  startGame,
  editChampion,
};

export default roomService;

export const roomKey = "rooms";
