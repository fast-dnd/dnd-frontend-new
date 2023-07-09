import { DefaultMove, IChampion, ILocation, MoveType } from "@/types/dnd";
import { IAvatarSchema } from "@/app/(authed)/create-avatar/[[...avatarId]]/schemas/avatar-schema";

import createApi from "./api-factory";

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
  moveMapping: { [key in DefaultMove]?: string };
}

const postChampions = async (data: { champions: IPostChampion[] }) => {
  return await dndApi.post<IChampion[]>("champions", data);
};

const dndService = {
  // this should go to profile service
  getKingdom,
  getAvatar,
  createAvatar,
  updateAvatar,

  // this should go to dungeon service
  postLocations,
  postChampions,
};

export default dndService;
