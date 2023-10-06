import { rewardsSchema } from "@/validations/reward";

import createApi from "./api-factory";

const rewardApi = createApi({ commonPrefix: "rewards" });

const getRewards = async () => {
  return await rewardApi.get("").then((res) => rewardsSchema.parse(res.data));
};

const rewardService = {
  getRewards,
};

export default rewardService;

export const rewardKey = "rewards";
