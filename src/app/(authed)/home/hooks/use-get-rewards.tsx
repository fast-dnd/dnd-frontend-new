import { useQuery } from "@tanstack/react-query";

import kingdomService, { kingdomKey } from "@/services/kingdom-service";

const useGetRewards = () => {
  return useQuery({
    queryKey: [kingdomKey, "rewards"],
    queryFn: kingdomService.getRewards,
  });
};

export default useGetRewards;
