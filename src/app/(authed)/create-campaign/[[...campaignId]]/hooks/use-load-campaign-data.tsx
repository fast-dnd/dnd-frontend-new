import { useEffect } from "react";

import { ICampaignDetail } from "@/types/campaign";

import { campaignFormStore } from "../stores/campaign-form-store";

const useLoadCampaignData = ({ data }: { data?: ICampaignDetail }) => {
  useEffect(() => {
    if (data) {
      campaignFormStore.set({
        ...data,
        image: data.imageUrl,
      });
    }
  }, [data]);
};

export default useLoadCampaignData;
