import queryString from "query-string";

import { leaderboardSchema } from "@/validations/leaderboard";

import { LeaderboardMetricsType } from "@/app/(authed)/leaderboard/types/leaderboard-metrics-type";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const leaderboardApi = createApi({ commonPrefix: "leaderboards" });

interface IGetLeaderboardProps {
  filter: LeaderboardMetricsType;
  pageParam: number;
  currUserRank?: number;
}

const getLeaderboard = async ({ filter, pageParam, currUserRank }: IGetLeaderboardProps) => {
  const communityId = JSON.parse(localStorage.getItem("communityId") || "null");

  const skip = (currUserRank ? currUserRank - 1 : 0) + (pageParam - 1) * PAGINATION_LIMIT;
  const limit = skip >= 0 ? PAGINATION_LIMIT : Math.max(PAGINATION_LIMIT + skip, 0);
  const queryParams = queryString.stringify({
    skip: Math.max(0, skip),
    limit: limit,
    type: filter,
    communityId,
  });

  return await leaderboardApi
    .get("?" + queryParams)
    .then((res) => leaderboardSchema.parse(res.data));
};

const leaderboardService = {
  getLeaderboard,
};
export default leaderboardService;

export const leaderboardKey = "leaderboard";
