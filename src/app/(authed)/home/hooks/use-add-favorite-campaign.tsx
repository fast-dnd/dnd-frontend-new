import { useMutation, useQueryClient } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";

const useAddFavoriteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignService.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries([campaignKey, "favorite"]);
    },
  });
};

export default useAddFavoriteCampaign;
