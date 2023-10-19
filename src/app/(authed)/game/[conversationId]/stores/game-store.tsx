import { observable } from "@legendapp/state";

import { deepClone } from "@/utils/clone";

export interface PlayerStatusUpdate {
  lostHealth?: boolean;
  gainedHealth?: boolean;
  mana?: boolean;
  bonus?: boolean;
  gold?: boolean;
}

export interface IGameStore {
  pageState:
    | "DEFAULT"
    | "HOWTOPLAY"
    | "FEEDBACK"
    | "GOHOME"
    | "DYING"
    | "DIED"
    | "GAMEOVER"
    | "RATE";
  reward: boolean;
  statusUpdate: PlayerStatusUpdate;
}

export const initialGameStoreData: IGameStore = {
  pageState: "DEFAULT",
  reward: true,
  statusUpdate: {},
};

export const getInitialGameStoreData = () => deepClone(initialGameStoreData);

export const gameStore = observable<IGameStore>(getInitialGameStoreData());
