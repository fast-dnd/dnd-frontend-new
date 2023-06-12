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
  imageUrl?: string;
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
  moveMapping: {
    free_will?: string;
    discover_health: string;
    discover_mana: string;
    conversation_with_team: string;
    rest: string;
  };
}

interface IDungeonFormStore {
  currentStep: Step;
  setCurrentStep: (currentStep: Step) => void;
  dungeonFormData: IDungeonFormData;
  updateDungeonFormData: (dungeonFormData: Partial<IDungeonFormData>) => void;
  resetDungeonFormData: () => void;
}

export const useDungeonFormStore = create<IDungeonFormStore>()(
  devtools(
    persist(
      immer((set) => ({
        currentStep: "INITIAL",
        setCurrentStep: (currentStep: Step) => set({ currentStep }),
        dungeonFormData: {
          name: "",
          description: "",
          imageUrl: undefined,
          locations: [],
          champions: [],
        },
        updateDungeonFormData: (dungeonFormData: Partial<IDungeonFormData>) => {
          set((state) => {
            state.dungeonFormData = { ...state.dungeonFormData, ...dungeonFormData };
          });
        },
        resetDungeonFormData: () => {
          set((state) => {
            state.dungeonFormData = {
              id: undefined,
              name: "",
              description: "",
              imageUrl: undefined,
              locations: [],
              champions: [],
            };
          });
        },
      })),
      {
        name: "dungeon-creation-form-store",
      },
    ),
  ),
);
