import { observable } from "@legendapp/state";

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
    | "REWARD";
  statusUpdate: PlayerStatusUpdate;
}

export const gameStore = observable<IGameStore>({
  pageState: "DEFAULT",
  statusUpdate: {},
});
