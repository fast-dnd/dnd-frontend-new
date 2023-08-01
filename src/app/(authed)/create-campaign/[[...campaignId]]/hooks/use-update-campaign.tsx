import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import campaignService from "@/services/campaign-service";

const useUpdateCampaign = () => {
  return useMutation({
    mutationFn: campaignService.updateCampaign,
    onSuccess: (_data) => {
      toast.success("Campaign updated successfully!");
    },
  });
};

export default useUpdateCampaign;
