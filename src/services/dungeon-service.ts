import { dungeonDetailSchema, dungeonsSchema, IDungeonDetail, IRateDungeon } from "@/types/dungeon";

import createApi from "./api-factory";

const dungeonApi = createApi({ commonPrefix: "dungeons/" });

const getMyDungeons = async () => {
  return await dungeonApi.get("").then((res) => dungeonsSchema.parse(res.data));
};

const getRecommendedDungeons = async () => {
  return await dungeonApi.get("recommended").then((res) => dungeonsSchema.parse(res.data));
};

const getDungeon = async (dungeonId: string) => {
  return await dungeonApi.get(dungeonId).then((res) => dungeonDetailSchema.parse(res.data));
};

const createDungeon = async (data: IDungeonDetail) => {
  return await dungeonApi.post("", data);
};

const updateDungeon = async (data: IDungeonDetail) => {
  return await dungeonApi.put("", data);
};

const deleteDungeon = async (dungeonId: string) => {
  return await dungeonApi.delete(dungeonId);
};

const addFavorite = async (dungeonId: string) => {
  return await dungeonApi.post("favourite", { dungeonId });
};

const getFavorites = async () => {
  return await dungeonApi.get("favourite").then((res) => dungeonsSchema.parse(res.data));
};

const getRecent = async () => {
  return await dungeonApi.get("recent").then((res) => dungeonsSchema.parse(res.data));
};

const rateDungeon = async (data: IRateDungeon) => {
  return await dungeonApi.post("rate", data);
};

const dungeonService = {
  createDungeon,
  updateDungeon,
  getDungeon,
  getMyDungeons,
  getRecommendedDungeons,
  deleteDungeon,
  addFavorite,
  getFavorites,
  getRecent,
  rateDungeon,
};

export default dungeonService;

export const dungeonKey = "dungeons";
