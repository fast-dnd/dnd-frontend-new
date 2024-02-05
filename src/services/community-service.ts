import { communitiesSchema, communitySchema } from "@/validations/community";

import { IBuildCommunitySchema } from "@/app/(authed)/communities/schemas/build-community-schema";

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

const buildCommunity = async (data: IBuildCommunitySchema) => {
  return await communityApi.post("build", data).then((res) => res.data);
};

const communityService = {
  getCommunities,
  getCommunity,
  getDefaultCommunity,
  buildCommunity,
};

export default communityService;

export const communityKey = "communities";
