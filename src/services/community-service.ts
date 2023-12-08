import { communitiesSchema, communitySchema } from "@/validations/community";

import createApi from "./api-factory";

const communityApi = createApi({ commonPrefix: "communities" });

const getCommunities = async () => {
  return await communityApi.get("").then((res) => communitiesSchema.parse(res.data));
};

const getCommunity = async (id: string) => {
  return await communityApi.get(id).then((res) => communitySchema.parse(res.data));
};

const getDefaultCommunity = async () => {
  return await communityApi.get<{ _id: string }>("default").then((res) => res.data);
};

const communityService = {
  getCommunities,
  getCommunity,
  getDefaultCommunity,
};

export default communityService;

export const communityKey = "communities";
