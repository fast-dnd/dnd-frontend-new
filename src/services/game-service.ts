import { gameRoomDataSchema, IPlayMove, playMoveResponseSchema } from "@/types/game";

import createApi from "./api-factory";

const roomApi = createApi({ commonPrefix: "rooms" });
const gameApi = createApi({ commonPrefix: "game" });

const playMove = async (data: IPlayMove) => {
  return await gameApi.post("play", data).then((res) => playMoveResponseSchema.parse(res.data));
};

const postComplaint = async (data: { text: string }) => {
  return await gameApi.post("complaint", data);
};

const postQuestion = async (data: { question: string; conversationId: string }) => {
  return await gameApi.post("ask", data);
};

const getGameData = async (conversationId: string) => {
  return await roomApi.get(conversationId).then((res) => gameRoomDataSchema.parse(res.data));
};

const gameService = {
  playMove,
  postComplaint,
  postQuestion,
  getGameData,
};

export default gameService;

export const gameKey = "game";
