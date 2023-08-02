import { observable } from "@legendapp/state";

export const homeTabs = ["PLAY", "MY KINGDOM", "SETTINGS", "HOW TO PLAY"] as const;

export type HomeTabType = (typeof homeTabs)[number];

export const baseTabs = ["adventures", "campaigns"] as const;

export type BaseTabType = (typeof baseTabs)[number];

export const subTabs = ["top", "recent", "favorite", "owned"] as const;

export type SubTabType = (typeof subTabs)[number];

export const kingdomTabs = ["dungeons", "campaigns", "rewards"] as const;

export type KingdomTabType = (typeof kingdomTabs)[number];

interface IHomeStore {
  homeTab: HomeTabType;
  baseTab: BaseTabType;
  subTab: SubTabType;
  kingdomTab: KingdomTabType;
}

export const homeStore = observable<IHomeStore>({
  homeTab: "PLAY",
  baseTab: "adventures",
  subTab: "top",
  kingdomTab: "dungeons",
});
