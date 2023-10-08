import { observable } from "@legendapp/state";

export interface PlayerChanges {
  lostHealth?: boolean;
  gainedHealth?: boolean;
  gainedMana?: boolean;
  gainedBonus?: boolean;
  gainedGold?: boolean;
}

export interface IGameStore {
  displayHowToPlay: boolean;
  displayFeedback: boolean;
  homeModal: boolean;
  diedModal: boolean;
  rewardModal: boolean;
  gameOverModal: boolean;
  dying: boolean;
  changes: PlayerChanges;
}

export const gameStore = observable<IGameStore>({
  displayHowToPlay: false,
  displayFeedback: false,
  homeModal: false,
  diedModal: false,
  rewardModal: false,
  gameOverModal: false,
  dying: false,
  changes: {},
});
