import { useQuery } from "@tanstack/react-query";

import communityService, { communityKey } from "@/services/community-service";

const useGetCommunity = (communityId?: string) => {
  return useQuery({
    queryKey: [communityKey, communityId],
    queryFn: () => communityService.getCommunity(communityId || ""),
    enabled: !!communityId,
  });
};

export default useGetCommunity;
