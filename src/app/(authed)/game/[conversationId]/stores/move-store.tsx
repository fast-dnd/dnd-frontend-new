import { observable } from "@legendapp/state";

import { IPlayMoveResponse } from "@/types/game";
import { IDefaultMove } from "@/types/room";
import { deepClone } from "@/utils/clone";

export interface IMoveStore {
  canPlay: boolean;
  buttonState: "DEFAULT" | "ROLLING" | "ROLLED";
  freeWill: string;
  powerup: number;
  dice: [number, number];
  move?: IDefaultMove;
  roll?: IPlayMoveResponse;
  aiDescription?: string;
}

export const initialMoveStoreData: IMoveStore = {
  canPlay: true,
  buttonState: "DEFAULT",
  freeWill: "",
  powerup: 0,
  dice: [0, 0],
};

export const getInitialMoveStoreData = () => deepClone(initialMoveStoreData);

export const moveStore = observable<IMoveStore>(getInitialMoveStoreData());
