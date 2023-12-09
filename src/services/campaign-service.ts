import queryString from "query-string";

import { ICampaignForBackend } from "@/types/campaign";
import {
  campaignDetailSchema,
  campaignResponseSchema,
  campaignsSchema,
} from "@/validations/campaign";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const campaignApi = createApi({ commonPrefix: "campaigns" });

const getCampaigns = async ({ filter, pageParam }: { filter: string; pageParam: number }) => {
  const communityId = JSON.parse(localStorage.getItem("communityId") || "{}");

  const queryParams = queryString.stringify({
    filter,
    skip: (pageParam - 1) * PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
    communityId,
  });

  return await campaignApi.get("?" + queryParams).then((res) => campaignsSchema.parse(res.data));
};

const getCampaign = async (campaignId: string) => {
  return await campaignApi.get(campaignId).then((res) => campaignDetailSchema.parse(res.data));
};

const createCampaign = async (data: ICampaignForBackend) => {
  return await campaignApi.post("", data).then((res) => campaignResponseSchema.parse(res.data));
};

const updateCampaign = async (data: ICampaignForBackend & { campaignId: string }) => {
  return await campaignApi
    .put(data.campaignId, data)
    .then((res) => campaignResponseSchema.parse(res.data));
};

const deleteCampaign = async (campaignId: string) => {
  return await campaignApi.delete(campaignId);
};

const addFavorite = async (campaignId: string) => {
  return await campaignApi.post("favourite", { campaignId });
};

const addDungeonToCampaign = async (data: { campaignId: string; dungeonId: string }) => {
  return await campaignApi.post(`${data.campaignId}/add-dungeon`, { dungeonId: data.dungeonId });
};

const campaignService = {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  addFavorite,
  addDungeonToCampaign,
};
export default campaignService;

export const campaignKey = "campaigns";
