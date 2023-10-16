import { useQuery } from "@tanstack/react-query";

import rewardService, { rewardKey } from "@/services/reward-service";

const useGetRewards = () => {
  return useQuery({
    queryKey: [rewardKey],
    queryFn: rewardService.getRewards,
  });
};

export default useGetRewards;
