import { create } from "zustand";
import { HomeTabType, DungeonTabType } from "../types/home";

interface IHomeStore {
  homeTab: HomeTabType;
  dungeonTab: DungeonTabType;
  setHomeTab: (homeTab: HomeTabType) => void;
  setDungeonTab: (dungeonTab: DungeonTabType) => void;
  displayHowToPlay: boolean;
  setDisplayHowToPlay: (displayHowToPlay: boolean) => void;
}

export const useHomeStore = create<IHomeStore>()((set) => ({
  homeTab: "PLAY",
  dungeonTab: "top dungeons",
  setHomeTab: (homeTab: HomeTabType) => set({ homeTab }),
  setDungeonTab: (dungeonTab: DungeonTabType) => set({ dungeonTab }),
  displayHowToPlay: false,
  setDisplayHowToPlay: (displayHowToPlay: boolean) => set({ displayHowToPlay }),
}));
