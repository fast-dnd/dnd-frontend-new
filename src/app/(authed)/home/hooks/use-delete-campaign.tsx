"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";

const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignService.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries([campaignKey, "owned"]);
    },
  });
};

export default useDeleteCampaign;
