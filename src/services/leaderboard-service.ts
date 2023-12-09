import queryString from "query-string";

import { leaderboardSchema } from "@/validations/leaderboard";

import { RatingType } from "@/app/(authed)/leaderboard/types/rating-type";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const leaderboardApi = createApi({ commonPrefix: "leaderboards" });

const getLeaderboard = async ({
  filter,
  pageParam,
  currUserRank,
}: {
  filter: RatingType;
  pageParam: number;
  currUserRank?: number;
}) => {
  const communityId = JSON.parse(localStorage.getItem("communityId") || "{}");

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
