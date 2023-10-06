import { observable } from "@legendapp/state";

import { IBaseDungeon } from "@/types/dungeon";
import { deepClone } from "@/utils/clone";

interface ICampaignFormStore {
  name: string;
  image: string;
  description: string;
  dungeons: IBaseDungeon[];
}

const initialCampaignFormData: ICampaignFormStore = {
  name: "",
  image: "",
  description: "",
  dungeons: [],
};

export const getInitialCampaignFormData = () => deepClone(initialCampaignFormData);

export const campaignFormStore = observable<ICampaignFormStore>(getInitialCampaignFormData());
