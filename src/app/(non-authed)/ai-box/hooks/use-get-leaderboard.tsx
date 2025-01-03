import { useInfiniteQuery } from "@tanstack/react-query";

import aiBoxService, { aiBoxKey } from "@/services/aibox-service";
import { PAGINATION_LIMIT } from "@/services/api-factory";

interface IUseGetAiBoxLeaderboardProps {
  epoch: number;
  boxId?: string;
}

const useGetAiBoxLeaderboard = ({ epoch, boxId }: IUseGetAiBoxLeaderboardProps) => {
  return useInfiniteQuery({
    queryKey: [aiBoxKey, epoch, boxId],
    queryFn: ({ pageParam = 1 }) => aiBoxService.getAiBoxLeaderboard({ epoch, boxId, pageParam }),
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

export default useGetAiBoxLeaderboard;
