import { useMutation, useQueryClient } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";

const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignService.updateCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries([campaignKey]);
    },
  });
};

export default useUpdateCampaign;
