import { observable } from "@legendapp/state";

import { IBaseDungeon } from "@/types/dungeon";

interface ICampaignFormStore {
  name: string;
  image: string;
  description: string;
  dungeons: IBaseDungeon[];
}

export const campaignFormStore = observable<ICampaignFormStore>({
  name: "",
  image: "",
  description: "",
  dungeons: [],
});
