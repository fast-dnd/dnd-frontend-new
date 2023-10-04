"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import campaignService, { campaignKey } from "@/services/campaign-service";

const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignService.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries([campaignKey, "owned"]);
      toast.success("Campaign deleted successfully!");
    },
  });
};

export default useDeleteCampaign;
