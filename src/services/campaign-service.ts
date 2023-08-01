import { campaignDetailSchema, campaignsSchema } from "@/types/dungeon";
import { ICampaignSchema } from "@/app/(authed)/create-campaign/[[...campaignId]]/schemas/campaign-schema";

import createApi from "./api-factory";

const campaignApi = createApi({ commonPrefix: "campaigns/" });

const getRecommended = async () => {
  return await campaignApi.get("recommended").then((res) => campaignsSchema.parse(res.data));
};

const getFavorites = async () => {
  return await campaignApi.get("favourite").then((res) => campaignsSchema.parse(res.data));
};

const getMyCampaigns = async () => {
  return await campaignApi.get("").then((res) => campaignsSchema.parse(res.data));
};

const getRecent = async () => {
  return await campaignApi.get("recent").then((res) => campaignsSchema.parse(res.data));
};

const getCampaign = async (campaignId: string) => {
  return await campaignApi.get(campaignId).then((res) => campaignDetailSchema.parse(res.data));
};

const addFavorite = async (campaignId: string) => {
  return await campaignApi.post("favourite", { campaignId });
};

const createCampaign = async (data: ICampaignSchema) => {
  return await campaignApi.post("", data);
};

const updateCampaign = async (data: ICampaignSchema & { campaignId: string }) => {
  return await campaignApi.put(data.campaignId, data);
};

const campaignService = {
  getRecommended,
  getFavorites,
  getMyCampaigns,
  getRecent,
  getCampaign,
  addFavorite,
  createCampaign,
  updateCampaign,
};
export default campaignService;

export const campaignKey = "campaigns";
