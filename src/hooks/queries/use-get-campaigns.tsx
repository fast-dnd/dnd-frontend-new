import { useInfiniteQuery } from "@tanstack/react-query";

import { PAGINATION_LIMIT } from "@/services/api-factory";
import campaignService, { campaignKey } from "@/services/campaign-service";

import useCommunity from "../helpers/use-community";

const useGetCampaigns = ({ filter, name }: { filter: string; name?: string }) => {
  const { communityId } = useCommunity();

  return useInfiniteQuery({
    queryKey: [campaignKey, filter, name],
    queryFn: ({ pageParam = 1 }) => campaignService.getCampaigns({ pageParam, filter, name }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.campaigns.length === PAGINATION_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    enabled: !!communityId,
  });
};

export default useGetCampaigns;
