import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import campaignService from "@/services/campaign-service";

const useCreateCampaign = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: campaignService.createCampaign,
    onSuccess: (_data) => {
      router.push("/home");
      toast.success("Campaign created successfully!");
    },
  });
};

export default useCreateCampaign;
