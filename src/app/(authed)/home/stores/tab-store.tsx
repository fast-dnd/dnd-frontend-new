import { observable } from "@legendapp/state";

export const homeTabs = ["PLAY", "MY KINGDOM", "SETTINGS", "HOW TO PLAY"] as const;

export type HomeTabType = (typeof homeTabs)[number];

export const dungeonTabs = ["top dungeons", "my dungeons", "favorite dungeons"] as const;

export type DungeonTabType = (typeof dungeonTabs)[number];

interface IHomeStore {
  homeTab: HomeTabType;
  dungeonTab: DungeonTabType;
}

export const homeStore = observable<IHomeStore>({
  homeTab: "PLAY",
  dungeonTab: "top dungeons",
});
