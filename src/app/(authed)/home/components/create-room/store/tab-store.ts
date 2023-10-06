import { observable } from "@legendapp/state";

export const baseTabs = ["adventures", "campaigns"] as const;

export type BaseTabType = (typeof baseTabs)[number];

export const subTabs = ["top", "recommended", "recent", "owned", "favourite"] as const;

export type SubTabType = (typeof subTabs)[number];

interface IHomeStore {
  baseTab: BaseTabType;
  subTab: SubTabType;
}

export const tabStore = observable<IHomeStore>({
  baseTab: "adventures",
  subTab: "top",
});
