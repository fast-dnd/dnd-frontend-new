import { useQuery } from "@tanstack/react-query";

import communityService, { communityKey } from "@/services/community-service";

import useCommunity from "../helpers/use-community";

const useGetCurrentCommunity = () => {
  const { isDefault, communityId } = useCommunity();

  return useQuery({
    queryKey: [communityKey, communityId],
    queryFn: () => communityService.getCommunity(communityId || ""),
    enabled: !isDefault && !!communityId,
  });
};

export default useGetCurrentCommunity;
