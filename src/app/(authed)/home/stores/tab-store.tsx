import { create } from "zustand";
import { HomeTabType, DungeonTabType } from "../types/home";

interface ITabStore {
  homeTab: HomeTabType;
  dungeonTab: DungeonTabType;
  setHomeTab: (homeTab: HomeTabType) => void;
  setDungeonTab: (dungeonTab: DungeonTabType) => void;
}

export const useTabStore = create<ITabStore>()((set, get) => ({
  homeTab: "PLAY",
  dungeonTab: "MY DUNGEONS",
  setHomeTab: (homeTab: HomeTabType) => set({ homeTab }),
  setDungeonTab: (dungeonTab: DungeonTabType) => set({ dungeonTab }),
}));
