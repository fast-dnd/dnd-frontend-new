import queryString from "query-string";

import { aiBoxSchema } from "@/validations/aibox";
import { leaderboardSchema } from "@/validations/leaderboard";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const aiBoxApi = createApi({ commonPrefix: "ai-box" });

interface IGetLeaderboardProps {
  epoch: number;
  pageParam: number;
}

const getAiBoxLeaderboard = async ({ epoch, pageParam }: IGetLeaderboardProps) => {
  const skip = (pageParam - 1) * PAGINATION_LIMIT;
  const limit = skip >= 0 ? PAGINATION_LIMIT : Math.max(PAGINATION_LIMIT + skip, 0);
  const queryParams = queryString.stringify({
    skip: Math.max(0, skip),
    limit: limit,
  });

  return await aiBoxApi
    .get(`/leaderboard/${epoch}?` + queryParams)
    .then((res) => leaderboardSchema.parse(res.data));
};

const getLatestAiBox = async () => {
  return await aiBoxApi.get("latest").then((res) => aiBoxSchema.parse(res.data));
};

const aiBoxService = {
  getAiBoxLeaderboard,
  getLatestAiBox,
};

export default aiBoxService;

export const aiBoxKey = "aiBox";
