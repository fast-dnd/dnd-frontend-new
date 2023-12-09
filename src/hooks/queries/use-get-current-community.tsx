import { useQuery } from "@tanstack/react-query";
import { useReadLocalStorage } from "usehooks-ts";

import communityService, { communityKey } from "@/services/community-service";

const useGetCurrentCommunity = () => {
  const defaultCommunityId = useReadLocalStorage<string>("defaultCommunityId");
  const communityId = useReadLocalStorage<string>("communityId");
  const isDefault = Boolean(
    defaultCommunityId && communityId && defaultCommunityId === communityId,
  );

  return useQuery({
    queryKey: [communityKey, communityId],
    queryFn: () => communityService.getCommunity(communityId || ""),
    enabled: !isDefault,
  });
};

export default useGetCurrentCommunity;
