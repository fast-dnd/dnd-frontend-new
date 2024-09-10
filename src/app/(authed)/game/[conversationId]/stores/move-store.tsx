import { observable } from "@legendapp/state";

import { IPlayMoveResponse } from "@/types/game";
import { deepClone } from "@/utils/clone";

export interface IMoveStore {
  canPlay: boolean;
  buttonState: "DEFAULT" | "ROLLING" | "ROLLED";
  freeWill: string;
  wordsChallenge: string[];
  powerup: number;
  randomDice: [number, number];
  dice: [number, number];
  roll?: IPlayMoveResponse;
  aiDescription?: string;
}

export const initialMoveStoreData: IMoveStore = {
  canPlay: true,
  buttonState: "DEFAULT",
  freeWill: "",
  wordsChallenge: [],
  powerup: 0,
  randomDice: [1, 1],
  dice: [0, 0],
};

export const getInitialMoveStoreData = () => deepClone(initialMoveStoreData);

export const moveStore = observable<IMoveStore>(getInitialMoveStoreData());
