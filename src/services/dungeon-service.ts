import queryString from "query-string";

import { IDungeonForBackend, IDungeonTxForBackend, IRateDungeon } from "@/types/dungeon";
import {
  dungeonDetailSchema,
  dungeonResponseSchema,
  dungeonsSchema,
  dungeonTxResponseSchema,
} from "@/validations/dungeon";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const dungeonApi = createApi({ commonPrefix: "dungeons" });

const getDungeons = async ({
  filter,
  pageParam,
  name,
}: {
  filter: string;
  pageParam: number;
  name?: string;
}) => {
  const communityId = JSON.parse(localStorage.getItem("communityId") || "null");

  const queryParams = queryString.stringify({
    filter,
    name,
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
  const communityId = JSON.parse(localStorage.getItem("communityId") || "null");

  return await dungeonApi
    .post("", {
      ...data,
      communityId,
      creatorWalletAddress: data.creatorWalletAddress || "",
      transaction: data.transaction || "",
    })
    .then((res) => dungeonResponseSchema.parse(res.data));
};

const createDungeonTx = async (data: IDungeonTxForBackend) => {
  const communityId = JSON.parse(localStorage.getItem("communityId") || "null");

  return await dungeonApi
    .post("tx", {
      ...data,
      communityId,
    })
    .then((res) => dungeonTxResponseSchema.parse(res.data));
};

const updateDungeon = async (data: IDungeonForBackend) => {
  return await dungeonApi.put("", data).then((res) => dungeonResponseSchema.parse(res.data));
};

const deleteDungeon = async (dungeonId: string) => {
  return await dungeonApi.delete(dungeonId);
};

const addFavorite = async (dungeonId: string) => {
  return await dungeonApi
    .post<{ message: string }>("favourite", { dungeonId })
    .then((res) => res.data);
};

const rateDungeon = async (data: IRateDungeon) => {
  return await dungeonApi.post("rate", data);
};

const dungeonService = {
  getDungeons,
  getDungeon,
  createDungeon,
  createDungeonTx,
  updateDungeon,
  deleteDungeon,
  addFavorite,
  rateDungeon,
};

export default dungeonService;

export const dungeonKey = "dungeons";
