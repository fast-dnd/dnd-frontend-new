import { observable } from "@legendapp/state";

import { IPlayMoveResponse } from "@/types/game";
import { IDefaultMove } from "@/types/room";
import { deepClone } from "@/utils/clone";

export interface IMoveStore {
  canPlay: boolean;
  buttonState: "CANPLAY" | "ROLLING" | "ROLLED";
  freeWill: string;
  powerup: number;
  dice: [number, number];
  move?: IDefaultMove;
  roll?: IPlayMoveResponse;
}

export const initialMoveStoreData: IMoveStore = {
  canPlay: true,
  buttonState: "CANPLAY",
  freeWill: "",
  powerup: 0,
  dice: [0, 0],
  move: undefined,
  roll: undefined,
};

export const getInitialMoveStoreData = () => deepClone(initialMoveStoreData);

export const moveStore = observable<IMoveStore>(getInitialMoveStoreData());
