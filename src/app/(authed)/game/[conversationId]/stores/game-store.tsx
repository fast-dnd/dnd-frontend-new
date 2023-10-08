import { observable } from "@legendapp/state";

export interface PlayerStatusUpdate {
  lostHealth?: boolean;
  gainedHealth?: boolean;
  mana?: boolean;
  bonus?: boolean;
  gold?: boolean;
}

export interface IGameStore {
  displayHowToPlay: boolean;
  displayFeedback: boolean;
  homeModal: boolean;
  diedModal: boolean;
  rewardModal: boolean;
  gameOverModal: boolean;
  dying: boolean;
  statusUpdate: PlayerStatusUpdate;
}

export const gameStore = observable<IGameStore>({
  displayHowToPlay: false,
  displayFeedback: false,
  homeModal: false,
  diedModal: false,
  rewardModal: false,
  gameOverModal: false,
  dying: false,
  statusUpdate: {},
});
