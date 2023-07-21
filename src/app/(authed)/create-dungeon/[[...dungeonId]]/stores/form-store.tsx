import { observable } from "@legendapp/state";

import { Step } from "../utils/step-utils";
import { IDungeonDetailWithTags } from "../utils/tags-utils";

export const initialFormData: IDungeonDetailWithTags = {
  _id: "",
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

export type IFormStore = {
  currentStep: Step;
  dungeonFormData: IDungeonDetailWithTags;
};

export const formStore = observable<IFormStore>({
  currentStep: "INITIAL",
  dungeonFormData: initialFormData,
});
