import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { IPlayer, IRoomDetail } from "@/types/room";

import { gameStore, PlayerStatusUpdate } from "../stores/game-store";

const useHandlePlayerStatusUpdate = ({ roomData }: { roomData?: IRoomDetail }) => {
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();

  const accountId = useReadLocalStorage<string>("accountId");

  const getStatusUpdate = (prev: IPlayer, curr: IPlayer) => {
    const update: PlayerStatusUpdate = {};

    if (curr.health < prev.health) update.lostHealth = true;
    if (curr.health > prev.health) update.gainedHealth = true;
    if (curr.mana !== prev.mana) update.mana = true;
    if (curr.bonusForNextRound !== prev.bonusForNextRound) update.bonus = true;
    if (curr.gold !== prev.gold) update.gold = true;

    return update;
  };

  const displayStatusUpdate = (update: PlayerStatusUpdate, curr: IPlayer) => {
    if (Object.keys(update).length) {
      gameStore.statusUpdate.set(update);
      if (update.lostHealth && curr.health <= 0) gameStore.dying.set(true);

      const updateTimeout = setTimeout(() => {
        gameStore.statusUpdate.set({});
        if (update.lostHealth && curr.health <= 0) {
          gameStore.dying.set(false);
          gameStore.diedModal.set(true);
        }
      }, 1500);

      return updateTimeout;
    }
  };

  useEffect(() => {
    if (roomData) {
      const updatedPlayer = roomData.playerState.find((player) => player.accountId === accountId);
      if (updatedPlayer && currentPlayer) {
        const update = getStatusUpdate(updatedPlayer, currentPlayer);

        const timeout = displayStatusUpdate(update, currentPlayer);

        return () => {
          if (timeout) clearTimeout(timeout);
        };
      }

      setCurrentPlayer(updatedPlayer);
    }
  }, [accountId, currentPlayer, roomData]);

  return { currentPlayer };
};

export default useHandlePlayerStatusUpdate;
