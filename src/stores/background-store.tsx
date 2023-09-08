import { observable } from "@legendapp/state";

interface IBackgroundStore {
  bgUrl: string;
}

export const backgroundStore = observable<IBackgroundStore>({
  bgUrl: "",
});
