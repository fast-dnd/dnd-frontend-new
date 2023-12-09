import queryString from "query-string";

import { IDungeonForBackend, IRateDungeon } from "@/types/dungeon";
import { dungeonDetailSchema, dungeonResponseSchema, dungeonsSchema } from "@/validations/dungeon";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const dungeonApi = createApi({ commonPrefix: "dungeons" });

const getDungeons = async ({ filter, pageParam }: { filter: string; pageParam: number }) => {
  const communityId = JSON.parse(localStorage.getItem("communityId") || "null");

  const queryParams = queryString.stringify({
    filter,
    skip: (pageParam - 1) * PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
    communityId,
  });

  return await dungeonApi.get("?" + queryParams).then((res) => dungeonsSchema.parse(res.data));
};

const getDungeon = async (dungeonId: string) => {
  return await dungeonApi.get(dungeonId).then((res) => dungeonDetailSchema.parse(res.data));
};

const createDungeon = async (data: IDungeonForBackend) => {
  return await dungeonApi.post("", data).then((res) => dungeonResponseSchema.parse(res.data));
};

const updateDungeon = async (data: IDungeonForBackend) => {
  return await dungeonApi.put("", data).then((res) => dungeonResponseSchema.parse(res.data));
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
