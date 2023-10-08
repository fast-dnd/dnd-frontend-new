import { observable } from "@legendapp/state";

import { IPlayMoveResponse } from "@/types/game";
import { IDefaultMove } from "@/types/room";

export interface IMoveStore {
  canPlay: boolean;
  buttonState: "CANPLAY" | "ROLLING" | "ROLLED";
  freeWill: string;
  powerup: number;
  dice: [number, number];
  move?: IDefaultMove;
  roll?: IPlayMoveResponse;
}

export const moveStore = observable<IMoveStore>({
  canPlay: true,
  buttonState: "CANPLAY",
  freeWill: "",
  powerup: 0,
  dice: [0, 0],
});
