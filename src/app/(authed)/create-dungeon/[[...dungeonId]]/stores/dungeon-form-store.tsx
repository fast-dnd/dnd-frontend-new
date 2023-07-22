import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

import { Step } from "../utils/step-utils";
import { IDungeonDetailWithTags } from "../utils/tags-utils";

export const initialDungeonFormData: IDungeonDetailWithTags = {
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

export const getInitialDungeonFormData = () =>
  JSON.parse(JSON.stringify(initialDungeonFormData)) as IDungeonDetailWithTags;

export type IDungeonFormStore = {
  currentStep: Step;
  dungeonFormData: IDungeonDetailWithTags;
};

export const dungeonFormStore = observable<IDungeonFormStore>({
  currentStep: "INITIAL",
  dungeonFormData: getInitialDungeonFormData(),
});

persistObservable(dungeonFormStore, {
  persistLocal: ObservablePersistLocalStorage,
  local: "dungeon-form-store",
});