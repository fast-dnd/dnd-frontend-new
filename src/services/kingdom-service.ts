import { avatarSchema, kingdomSchema } from "@/types/kingdom";
import { IAvatarSchema } from "@/app/(authed)/create-avatar/[[...avatarId]]/schemas/avatar-schema";

import createApi from "./api-factory";

const kingdomApi = createApi({ commonPrefix: "kingdom" });

const getKingdom = async () => {
  return await kingdomApi.get("").then((res) => kingdomSchema.parse(res.data));
};

const getAvatar = async (avatarId: string) => {
  return await kingdomApi.get(`avatar/${avatarId}`).then((res) => avatarSchema.parse(res.data));
};

const createAvatar = async (data: IAvatarSchema) => {
  return await kingdomApi.post("avatar", data);
};

const updateAvatar = async (data: IAvatarSchema & { avatarId: string }) => {
  return await kingdomApi.put("avatar", data);
};

const kingdomService = {
  getKingdom,
  getAvatar,
  createAvatar,
  updateAvatar,
};

export default kingdomService;

export const kingdomKey = "kingdom";
