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
  changes: PlayerChanges;
}

export const gameStore = observable<IGameStore>({
  displayHowToPlay: false,
  displayFeedback: false,
  homeModal: false,
  diedModal: false,
  changes: {},
});
