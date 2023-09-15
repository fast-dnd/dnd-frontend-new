import { useInfiniteQuery } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";
import { LIMIT } from "@/services/query-helper";

const useGetCampaigns = ({ filter }: { filter: string }) => {
  return useInfiniteQuery({
    queryKey: [campaignKey, filter],
    queryFn: ({ pageParam = 1 }) => campaignService.getCampaigns({ pageParam, filter }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.campaigns.length === LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useGetCampaigns;
