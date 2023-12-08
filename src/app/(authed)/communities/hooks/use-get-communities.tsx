import { useQuery } from "@tanstack/react-query";

import communityService, { communityKey } from "@/services/community-service";

const useGetCommunities = ({ isDefault }: { isDefault?: boolean }) => {
  return useQuery({
    queryKey: [communityKey],
    queryFn: communityService.getCommunities,
    enabled: isDefault === false,
  });
};

export default useGetCommunities;
