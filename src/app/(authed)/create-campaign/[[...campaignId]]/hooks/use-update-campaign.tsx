import { useMutation } from "@tanstack/react-query";

import campaignService from "@/services/campaign-service";

const useUpdateCampaign = () => {
  return useMutation({
    mutationFn: campaignService.updateCampaign,
  });
};

export default useUpdateCampaign;
