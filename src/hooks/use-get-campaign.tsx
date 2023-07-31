"use client";

import { useQuery } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";

const useGetCampaign = (campaignId?: string) => {
  return useQuery({
    queryKey: [campaignKey, campaignId],
    queryFn: () => campaignService.getCampaign(campaignId || ""),
    enabled: !!campaignId,
  });
};

export default useGetCampaign;
