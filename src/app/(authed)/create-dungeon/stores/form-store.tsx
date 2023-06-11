import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { MoveType } from "@/types/dnd";

export const steps = ["INITIAL", "LOCATIONS", "CHAMPIONS", "FINAL"] as const;

export type Step = (typeof steps)[number];

export const stepTitles = {
  INITIAL: "Describe your dungeon",
  LOCATIONS: "Set up the scenarios",
  CHAMPIONS: "Define the roles",
  FINAL: "This is your dungeon ID",
} as const;

export interface IDungeonFormData {
  id?: string;
  name: string;
  description: string;
  locations: ILocationFormData[];
  champions: IChampionFormData[];
}

interface ILocationFormData {
  id?: string;
  name: string;
  description: string;
  mission: string;
  transition: string;
}

interface IChampionFormData {
  id?: string;
  name: string;
  description: string;
  moveMapping: { [key in MoveType]?: string };
}

interface IDungeonFormStore {
  currentStep: Step;
  setCurrentStep: (currentStep: Step) => void;
  dungeonFormData: IDungeonFormData;
  updateDungeonFormData: (dungeonFormData: Partial<IDungeonFormData>) => void;
}

export const useDungeonFormStore = create<IDungeonFormStore>()(
  devtools(
    persist(
      immer((set) => ({
        currentStep: "INITIAL",
        setCurrentStep: (currentStep: Step) => set({ currentStep }),
        dungeonFormData: {
          //TODO: swap this with api call
          name: "",
          description: "",
          locations: [],
          champions: [],
        },
        updateDungeonFormData: (dungeonFormData: Partial<IDungeonFormData>) => {
          set((state) => {
            state.dungeonFormData = { ...state.dungeonFormData, ...dungeonFormData };
          });
        },
      })),
      {
        name: "dungeon-creation-form-store",
      },
    ),
  ),
);
