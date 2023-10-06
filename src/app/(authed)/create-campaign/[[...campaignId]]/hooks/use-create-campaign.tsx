import { useMutation, useQueryClient } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";

const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignService.createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries([campaignKey]);
    },
  });
};

export default useCreateCampaign;
