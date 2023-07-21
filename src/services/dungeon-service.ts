import { dungeonDetailSchema, dungeonsSchema, IDungeonFormData } from "@/types/dungeon";

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

const createDungeon = async (data: IDungeonFormData) => {
  return await dungeonApi.post("", { ...data, tags: data.tags.map((tag) => tag.value) });
};

const updateDungeon = async (data: IDungeonFormData) => {
  return await dungeonApi.put("", { ...data, tags: data.tags.map((tag) => tag.value) });
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

const dungeonService = {
  createDungeon,
  updateDungeon,
  getDungeon,
  getMyDungeons,
  getRecommendedDungeons,
  deleteDungeon,
  addFavorite,
  getFavorites,
};

export default dungeonService;

export const dungeonKey = "dungeons";
