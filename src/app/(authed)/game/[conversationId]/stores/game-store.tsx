import { create } from "zustand";

interface IGameStore {
  displayHowToPlay: boolean;
  setDisplayHowToPlay: (displayHowToPlay: boolean) => void;
  displayFeedback: boolean;
  setDisplayFeedback: (displayFeedback: boolean) => void;
  homeModal: boolean;
  setHomeModal: (homeModal: boolean) => void;
}

export const useGameStore = create<IGameStore>()((set) => ({
  displayHowToPlay: false,
  setDisplayHowToPlay: (displayHowToPlay: boolean) => set({ displayHowToPlay }),
  displayFeedback: false,
  setDisplayFeedback: (displayFeedback: boolean) => set({ displayFeedback }),
  homeModal: false,
  setHomeModal: (homeModal: boolean) => set({ homeModal }),
}));
