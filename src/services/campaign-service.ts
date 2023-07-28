import { campaignDetailSchema, campaignsSchema } from "@/types/dungeon";

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

const getCampaign = async (campaignId: string) => {
  return await campaignApi.get(campaignId).then((res) => campaignDetailSchema.parse(res.data));
};

const addFavorite = async (campaignId: string) => {
  return await campaignApi.post("favourite", { campaignId });
};

//todo recent

const campaignService = {
  getRecommended,
  getFavorites,
  getMyCampaigns,
  getCampaign,
  addFavorite,
};
export default campaignService;

export const campaignKey = "campaigns";
