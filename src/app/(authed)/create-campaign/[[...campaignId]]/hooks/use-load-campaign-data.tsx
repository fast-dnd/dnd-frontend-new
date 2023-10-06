import { useEffect } from "react";

import { ICampaignDetail } from "@/types/campaign";

import { campaignFormStore, getInitialCampaignFormData } from "../stores/campaign-form-store";

const useLoadCampaignData = ({ data }: { data?: ICampaignDetail }) => {
  console.log(data);
  useEffect(() => {
    if (data) {
      campaignFormStore.set({
        ...data,
        image: data.imageUrl,
      });
    } else {
      campaignFormStore.set(getInitialCampaignFormData());
    }
  }, [data]);
};

export default useLoadCampaignData;
