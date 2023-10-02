import { useMutation } from "@tanstack/react-query";

import campaignService from "@/services/campaign-service";

const useCreateCampaign = () => {
  return useMutation({
    mutationFn: campaignService.createCampaign,
  });
};

export default useCreateCampaign;
