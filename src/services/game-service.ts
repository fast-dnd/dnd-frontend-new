import { MoveType } from "@/types/dnd";
import createApi from "./api-factory";

const gameApi = createApi({});

export interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: MoveType;
  message?: string;
}

export interface IPlayMoveResponse {
  dice: number;
  diceAfterBonus: number;
  diceBreakdown: {
    aiDiceBonus: number;
    bonusApplied: number;
    dice: number;
    mana: number;
  };
}

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
