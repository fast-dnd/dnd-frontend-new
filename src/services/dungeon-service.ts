import { dungeonDetailSchema, dungeonsSchema, IDungeonDetail, IRateDungeon } from "@/types/dungeon";

import createApi from "./api-factory";

const dungeonApi = createApi({ commonPrefix: "dungeons" });

const getDungeons = async () => {
  return await dungeonApi.get("").then((res) => dungeonsSchema.parse(res.data));
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

const rateDungeon = async (data: IRateDungeon) => {
  return await dungeonApi.post("rate", data);
};

const dungeonService = {
  getDungeons,
  getDungeon,
  createDungeon,
  updateDungeon,
  deleteDungeon,
  addFavorite,
  rateDungeon,
};

export default dungeonService;

export const dungeonKey = "dungeons";
