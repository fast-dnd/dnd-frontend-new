import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

import useCommunity from "../helpers/use-community";

const useGetLeaderboardMetrics = () => {
  const { communityId } = useCommunity();

  return useQuery({
    queryKey: [accountKey, communityId, "rating"],
    queryFn: () => accountService.getLeaderboardMetrics(communityId ?? ""),
    enabled: !!communityId,
  });
};

export default useGetLeaderboardMetrics;
