import { useInfiniteQuery } from "@tanstack/react-query";

import { PAGINATION_LIMIT } from "@/services/api-factory";
import leaderboardService, { leaderboardKey } from "@/services/leaderboard-service";

import { RatingType } from "../types/rating-type";

const useGetLeaderboard = ({ filter }: { filter: RatingType }) => {
  return useInfiniteQuery({
    queryKey: [leaderboardKey, filter],
    queryFn: ({ pageParam = 1 }) => leaderboardService.getLeaderboard({ pageParam, filter }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === PAGINATION_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useGetLeaderboard;
