import { campaignDetailSchema, campaignsSchema, ICampaignForBackend } from "@/types/dungeon";

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

const createCampaign = async (data: ICampaignForBackend) => {
  return await campaignApi.post("", data);
};

const updateCampaign = async (data: ICampaignForBackend & { campaignId: string }) => {
  return await campaignApi.put(data.campaignId, data);
};

const deleteCampaign = async (campaignId: string) => {
  return await campaignApi.delete(campaignId);
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
  deleteCampaign,
};
export default campaignService;

export const campaignKey = "campaigns";
