import { useMutation } from "@tanstack/react-query";

import campaignService from "@/services/campaign-service";

const useAddFavoriteCampaign = () => {
  return useMutation({
    mutationFn: campaignService.addFavorite,
  });
};

export default useAddFavoriteCampaign;
