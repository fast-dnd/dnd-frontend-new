import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

import { deepClone } from "@/utils/clone";

import { Step } from "../utils/step-utils";
import { IDungeonDetailWithTags } from "../utils/tags-utils";

export const initialDungeonFormData: IDungeonDetailWithTags = {
  _id: "",
  name: "",
  maxPlayers: 3,
  recommendedResponseDetailsDepth: "blitz",
  description: "",
  tags: [],
  imageUrl: "",
  locations: [],
  champions: [],
  actionLevel: 0,
  misteryLevel: 0,
  realityLevel: 50,
  backgroundUrl: "",
};

export const getInitialDungeonFormData = () => deepClone(initialDungeonFormData);

export type IDungeonFormStore = {
  currentStep: Step;
  dungeonFormData: IDungeonDetailWithTags;
};

export const dungeonFormStore = observable<IDungeonFormStore>({
  currentStep: "General information",
  dungeonFormData: getInitialDungeonFormData(),
});

persistObservable(dungeonFormStore, {
  persistLocal: ObservablePersistLocalStorage,
  local: "dungeon-form-store",
});
