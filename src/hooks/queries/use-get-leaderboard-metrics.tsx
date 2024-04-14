import { useQuery } from "@tanstack/react-query";

import accountService, { accountKey } from "@/services/account-service";

import useAuth from "../helpers/use-auth";
import useCommunity from "../helpers/use-community";

const useGetLeaderboardMetrics = () => {
  const { communityId } = useCommunity();
  const { loggedIn } = useAuth();

  return useQuery({
    queryKey: [accountKey, communityId, "rating"],
    queryFn: () => accountService.getLeaderboardMetrics(communityId ?? ""),
    enabled: !!communityId && loggedIn,
  });
};

export default useGetLeaderboardMetrics;
