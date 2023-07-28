import { observable } from "@legendapp/state";

export const homeTabs = ["PLAY", "MY KINGDOM", "SETTINGS", "HOW TO PLAY"] as const;

export type HomeTabType = (typeof homeTabs)[number];

export const baseTabs = ["ADVENTURES", "CAMPAIGNS"] as const;

export type BaseTabType = (typeof baseTabs)[number];

export const subTabs = ["top", "recent", "favorite", "owned"] as const;

export type SubTabType = (typeof subTabs)[number];

interface IHomeStore {
  homeTab: HomeTabType;
  baseTab: BaseTabType;
  subTab: SubTabType;
}

export const homeStore = observable<IHomeStore>({
  homeTab: "PLAY",
  baseTab: "ADVENTURES",
  subTab: "top",
});
