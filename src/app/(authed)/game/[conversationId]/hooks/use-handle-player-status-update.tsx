import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { IPlayer, IRoomDetail } from "@/types/room";

import { gameStore, PlayerStatusUpdate } from "../stores/game-store";

const useHandlePlayerStatusUpdate = ({ roomData }: { roomData?: IRoomDetail }) => {
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();

  const accountId = useReadLocalStorage<string>("accountId");

  const getStatusUpdate = (prev: IPlayer, updated: IPlayer) => {
    const update: PlayerStatusUpdate = {};

    if (updated.health < prev.health) update.lostHealth = true;
    if (updated.health > prev.health) update.gainedHealth = true;
    if (updated.mana !== prev.mana) update.mana = true;
    if (updated.bonusForNextRound !== prev.bonusForNextRound) update.bonus = true;
    if (updated.gold !== prev.gold) update.gold = true;

    return update;
  };

  const displayStatusUpdate = (update: PlayerStatusUpdate, updated: IPlayer) => {
    if (Object.keys(update).length) {
      gameStore.statusUpdate.set(update);
      console.log(update);
      if (update.lostHealth && updated.health <= 0) gameStore.pageState.set("DYING");

      setTimeout(() => {
        gameStore.statusUpdate.set({});
        if (update.lostHealth && updated.health <= 0) {
          gameStore.pageState.set("DIED");
        }
      }, 1500);
    }
  };

  useEffect(() => {
    if (roomData) {
      const updatedPlayer = roomData.playerState.find((player) => player.accountId === accountId);
      if (updatedPlayer && currentPlayer) {
        const update = getStatusUpdate(currentPlayer, updatedPlayer);
        displayStatusUpdate(update, updatedPlayer);
      }

      setCurrentPlayer(updatedPlayer);
    }
  }, [accountId, currentPlayer, roomData]);

  return { currentPlayer };
};

export default useHandlePlayerStatusUpdate;
