import {
  IChampion,
  IDungeon,
  IDungeonFormData,
  ILocation,
  IPostChampion,
  IPostLocation,
} from "@/types/dungeon";

import createApi from "./api-factory";

const dungeonApi = createApi({ commonPrefix: "dungeons/" });

const getDungeons = async () => {
  return await dungeonApi.get<IDungeon[]>("").then((res) => res.data);
};

const getRecommendedDungeons = async () => {
  return await dungeonApi.get<IDungeon[]>("recommended").then((res) => res.data);
};

const getDungeon = async (dungeonId: string) => {
  return await dungeonApi.get<IDungeon>(dungeonId).then((res) => res.data);
};

const createDungeon = async (data: IDungeonFormData) => {
  return await dungeonApi.post<IDungeon>("", { ...data, tags: data.tags.map((tag) => tag.value) });
};

const updateDungeon = async (data: IDungeonFormData) => {
  return await dungeonApi.put<IDungeon>("", { ...data, tags: data.tags.map((tag) => tag.value) });
};

const deleteDungeon = async (dungeonId: string) => {
  return await dungeonApi.delete(dungeonId);
};

const addFavorite = async (dungeonId: string) => {
  return await dungeonApi.post("favourite", { dungeonId });
};

const getFavorites = async () => {
  return await dungeonApi.get<IDungeon[]>("favourite").then((res) => res.data);
};

const postLocations = async (data: { locations: IPostLocation[] }) => {
  return await dungeonApi.post<ILocation[]>("locations", data);
};

const postChampions = async (data: { champions: IPostChampion[] }) => {
  return await dungeonApi.post<IChampion[]>("champions", data);
};

const dungeonService = {
  createDungeon,
  updateDungeon,
  getDungeon,
  getDungeons,
  getRecommendedDungeons,
  deleteDungeon,
  addFavorite,
  getFavorites,
  postLocations,
  postChampions,
};

export default dungeonService;

export const dungeonKey = "dungeons";
