import { useQuery } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";

const useGetCampaigns = () => {
  return useQuery({
    queryKey: [campaignKey],
    queryFn: campaignService.getCampaigns,
  });
};

export default useGetCampaigns;
