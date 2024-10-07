import queryString from "query-string";

import { leaderboardSchema } from "@/validations/leaderboard";
import { tournamentSchema } from "@/validations/tournament";
import { validateTournamentsResponseSchema } from "@/validations/tournaments";

import createApi, { PAGINATION_LIMIT } from "./api-factory";

const tournamentApi = createApi({ commonPrefix: "tournaments" });

interface IGetLeaderboardProps {
  communityId: string;
  pageParam: number;
}

const getTournamentLeaderboard = async ({ communityId, pageParam }: IGetLeaderboardProps) => {
  const skip = (pageParam - 1) * PAGINATION_LIMIT;
  const limit = skip >= 0 ? PAGINATION_LIMIT : Math.max(PAGINATION_LIMIT + skip, 0);
  const queryParams = queryString.stringify({
    skip: Math.max(0, skip),
    limit: limit,
    communityId,
  });

  return await tournamentApi
    .get(`/leaderboard/${communityId}?` + queryParams)
    .then((res) => leaderboardSchema.parse(res.data));
};

const getLatestTournament = async () => {
  return await tournamentApi
    .get("latest")
    .then((res) => validateTournamentsResponseSchema.parse(res.data));
};

const getTournament = async () => {
  return await tournamentApi.get("/latest").then((res) => tournamentSchema.parse(res.data));
};

const tournamentService = {
  getLatestTournament,
  getTournament,
  getTournamentLeaderboard,
};

export default tournamentService;

export const tournamentKey = "tournament";
