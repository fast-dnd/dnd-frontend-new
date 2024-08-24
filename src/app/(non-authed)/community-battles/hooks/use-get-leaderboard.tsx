import { useInfiniteQuery } from "@tanstack/react-query";

import { PAGINATION_LIMIT } from "@/services/api-factory";
import tournamentService, { tournamentKey } from "@/services/tournament-service";

interface IUseGetTournamentLeaderboardProps {
  communityId: string;
}

const useGetTournamentLeaderboard = ({ communityId }: IUseGetTournamentLeaderboardProps) => {
  return useInfiniteQuery({
    queryKey: [tournamentKey, communityId],
    queryFn: ({ pageParam = 1 }) =>
      tournamentService.getTournamentLeaderboard({ communityId, pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.leaderboard.length === PAGINATION_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      if (firstPage.leaderboard.length > 0) {
        const firstItemRank = firstPage.leaderboard[0].rank;
        const previousSkip = firstItemRank - PAGINATION_LIMIT;
        if (previousSkip >= 0) {
          // Adjusted this calculation to not rely on currUserRank
          const param = Math.ceil(previousSkip / PAGINATION_LIMIT);
          return param > 0 ? param : undefined; // Return undefined if param is less than or equal to 0
        }
      }
      return undefined;
    },
  });
};

export default useGetTournamentLeaderboard;
