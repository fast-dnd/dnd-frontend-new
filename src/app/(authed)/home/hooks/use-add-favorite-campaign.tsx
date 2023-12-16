import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { accountKey } from "@/services/account-service";
import campaignService, { campaignKey } from "@/services/campaign-service";

const useAddFavoriteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignService.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries([campaignKey]);
      queryClient.invalidateQueries([accountKey]);
      toast.success("Campaign added to favorites");
    },
  });
};

export default useAddFavoriteCampaign;
