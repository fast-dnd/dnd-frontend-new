import { useInfiniteQuery } from "@tanstack/react-query";

import { PAGINATION_LIMIT } from "@/services/api-factory";
import leaderboardService, { leaderboardKey } from "@/services/leaderboard-service";

import { LeaderboardMetricsType } from "../types/rating-type";

interface IUseGetLeaderboardProps {
  filter: LeaderboardMetricsType;
  currUserRank?: number;
}

const useGetLeaderboard = ({ filter, currUserRank }: IUseGetLeaderboardProps) => {
  return useInfiniteQuery({
    queryKey: [leaderboardKey, filter, currUserRank],
    queryFn: ({ pageParam = 1 }) =>
      leaderboardService.getLeaderboard({ pageParam, filter, currUserRank }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.leaderboard.length === PAGINATION_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      if (!currUserRank) return undefined;

      if (firstPage.leaderboard.length > 0) {
        const firstItemRank = firstPage.leaderboard[0].rank;
        const previousSkip = firstItemRank - PAGINATION_LIMIT;
        if (previousSkip >= 0) {
          const param = Math.ceil((previousSkip - currUserRank + 1) / PAGINATION_LIMIT);
          return param;
        }
      }
      return undefined;
    },
  });
};

export default useGetLeaderboard;
