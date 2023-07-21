import { observable } from "@legendapp/state";

import { IDungeonDetail } from "@/types/dungeon";

export const initialFormData: IDungeonDetail = {
  name: "",
  maxPlayers: 3,
  recommendedResponseDetailsDepth: "blitz",
  description: "",
  style: "",
  tags: [],
  imageUrl: "",
  locations: [],
  champions: [],
};

export const formStoreLegend = observable<IDungeonDetail>(initialFormData);
