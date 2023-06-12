import { IChampion, ILocation, MoveType } from "@/types/dnd";

import createApi from "./api-factory";
import { IAvatarSchema } from "@/app/(authed)/create-avatar/[[...avatarId]]/schemas/avatar-schema";

const dndApi = createApi({});

export interface IPlayerMove {
  accountId: string;
  moveType: MoveType;
  message: string;
  dice: number;
  aiRating: number;
  aiDescriptionForRating: string;
}

export interface IAvatar {
  _id: string;
  name: string;
  energy: number;
  level: number;
  kingdomId: string;
  imageUrl?: string;
}

export interface IKingdom {
  avatars: IAvatar[];
  name: string;
  gold: number;
}

const getKingdom = async () => {
  return await dndApi.get<IKingdom>("kingdom").then((res) => res.data);
};

const getAvatar = async (avatarId: string) => {
  return await dndApi.get<IAvatar>(`avatar/${avatarId}`).then((res) => res.data);
};

const createAvatar = async (data: IAvatarSchema) => {
  return await dndApi.post("avatar", data);
};

const updateAvatar = async (data: IAvatarSchema & { avatarId: string }) => {
  return await dndApi.put("avatar", data);
};

interface IEditChampion {
  conversationId: string;
  championId: string;
}

const editChampion = async (data: IEditChampion) => {
  return await dndApi.put("player/champion/edit", data);
};

interface IEditAvatar {
  conversationId: string;
  avatarId: string;
}

const editAvatar = async (data: IEditAvatar) => {
  return await dndApi.put("player/avatar/edit", data);
};

interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: string;
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
  return await dndApi.post<IPlayMoveResponse>("play", data);
};

export interface IPostLocation {
  name: string;
  description: string;
  mission: string;
  transition: string;
}

const postLocations = async (data: { locations: IPostLocation[] }) => {
  return await dndApi.post<ILocation[]>("locations", data);
};

export interface IPostChampion {
  name: string;
  description: string;
  label: string;
  moveMapping: { [key in MoveType]?: string };
}

const postChampions = async (data: { champions: IPostChampion[] }) => {
  return await dndApi.post<IChampion[]>("champions", data);
};

const postComplaint = async (data: { text: string }) => {
  return await dndApi.post("complaint", data);
};

const postQuestion = async (data: { question: string; conversationId: string }) => {
  return await dndApi.post("ask", data);
};

const dndService = {
  // this should go to profile service
  getKingdom,
  getAvatar,
  createAvatar,
  updateAvatar,

  // this should go to room service
  editChampion,
  editAvatar,

  // this should go to dungeon service
  postLocations,
  postChampions,

  // this should go to game service
  playMove,
  postComplaint,
  postQuestion,
};

export default dndService;
