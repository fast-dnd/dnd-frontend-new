import { IPlayMove, IPlayMoveResponse } from "@/types/game";

import createApi from "./api-factory";

const gameApi = createApi({});

const playMove = async (data: IPlayMove) => {
  return await gameApi.post<IPlayMoveResponse>("play", data);
};

const postComplaint = async (data: { text: string }) => {
  return await gameApi.post("complaint", data);
};

const postQuestion = async (data: { question: string; conversationId: string }) => {
  return await gameApi.post("ask", data);
};

const gameService = {
  playMove,
  postComplaint,
  postQuestion,
};

export default gameService;

export const gameKey = "game";
