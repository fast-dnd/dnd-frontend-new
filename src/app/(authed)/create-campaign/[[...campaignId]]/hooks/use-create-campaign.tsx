import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import campaignService from "@/services/campaign-service";

const useCreateCampaign = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: campaignService.createCampaign,
    onSuccess: (_data) => {
      if (_data._id) router.push(`/create-campaign/${_data._id}`);
      toast.success("Campaign created successfully!");
    },
  });
};

export default useCreateCampaign;
