import queryString from "query-string";

import { leaderboardSchema } from "@/validations/leaderboard";

import { RatingType } from "@/app/(authed)/leaderboard/types/rating-type";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const leaderboardApi = createApi({ commonPrefix: "leaderboards" });

const getLeaderboard = async ({ filter, pageParam }: { filter: RatingType; pageParam: number }) => {
  const queryParams = queryString.stringify({
    skip: (pageParam - 1) * PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
  });

  return await leaderboardApi
    .get(filter + "?" + queryParams)
    .then((res) => leaderboardSchema.parse(res.data));
};

const leaderboardService = {
  getLeaderboard,
};
export default leaderboardService;

export const leaderboardKey = "leaderboard";
