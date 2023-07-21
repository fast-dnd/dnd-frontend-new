import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IChampion, IDungeonDetail, ILocation } from "@/types/dungeon";
import { DungeonDuration, DungeonTag } from "@/utils/dungeon-options";

export const steps = ["INITIAL", "LOCATIONS", "CHAMPIONS", "FINAL"] as const;

export type Step = (typeof steps)[number];

export type StatusType = "LIST" | "CREATING" | "EDITING";

export const stepTitles = {
  INITIAL: "Describe your dungeon",
  LOCATIONS: "Set up the scenarios",
  CHAMPIONS: "Define the roles",
  FINAL: "Dungeon Created",
} as const;

export const numberToStepArr = ["INITIAL", "LOCATIONS", "CHAMPIONS", "FINAL"] as Step[];

export const getPreviousStep = (currentStep: Step) => {
  const currentIndex = numberToStepArr.indexOf(currentStep);
  return numberToStepArr[currentIndex - 1];
};

export const getNextStep = (currentStep: Step) => {
  const currentIndex = numberToStepArr.indexOf(currentStep);
  return numberToStepArr[currentIndex + 1];
};

export interface IDungeonFormData {
  id?: string;
  name: string;
  maxPlayers: number;
  recommendedResponseDetailsDepth: DungeonDuration;
  description: string;
  style: string;
  tags: { label: DungeonTag; value: DungeonTag }[];
  imageUrl?: string;
  image?: string;
  locations: ILocation[];
  champions: IChampion[];
}

export const initialDungeonFormData: IDungeonFormData = {
  id: undefined,
  name: "",
  maxPlayers: 3,
  recommendedResponseDetailsDepth: "blitz",
  description: "",
  style: "",
  tags: [],
  imageUrl: undefined,
  image: undefined,
  locations: [],
  champions: [],
};

interface IDungeonFormStore {
  currentStep: Step;
  setCurrentStep: (currentStep: Step) => void;
  dungeonFormData: IDungeonFormData;
  populateDataFromAPI: (dungeonId: string, dungeonData: IDungeonDetail) => void;
  updateDungeonFormData: (dungeonFormData: Partial<IDungeonFormData>) => void;
  resetDungeonFormData: () => void;
}

export const useDungeonFormStore = create<IDungeonFormStore>()(
  devtools(
    persist(
      immer((set) => ({
        currentStep: "INITIAL",
        setCurrentStep: (currentStep: Step) => set({ currentStep }),
        dungeonFormData: initialDungeonFormData,
        populateDataFromAPI: (dungeonId: string, dungeonData: IDungeonDetail) => {
          set((state) => {
            state.dungeonFormData = {
              ...state.dungeonFormData,
              ...dungeonData,
              id: dungeonId,
              tags: dungeonData.tags.map((tag) => ({
                label: tag,
                value: tag,
              })),
            };
          });
        },
        updateDungeonFormData: (dungeonFormData: Partial<IDungeonFormData>) => {
          set((state) => {
            state.dungeonFormData = { ...state.dungeonFormData, ...dungeonFormData };
          });
        },
        resetDungeonFormData: () => {
          set((state) => {
            state.dungeonFormData = initialDungeonFormData;
          });
        },
      })),
      {
        name: "dungeon-creation-form-store",
      },
    ),
  ),
);
