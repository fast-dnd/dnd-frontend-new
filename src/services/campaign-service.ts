import { campaignDetailSchema, campaignsSchema, ICampaignForBackend } from "@/types/dungeon";

import createApi from "./api-factory";

const campaignApi = createApi({ commonPrefix: "campaigns" });

const getCampaigns = async () => {
  return await campaignApi.get("").then((res) => campaignsSchema.parse(res.data));
};

const getCampaign = async (campaignId: string) => {
  return await campaignApi.get(campaignId).then((res) => campaignDetailSchema.parse(res.data));
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
