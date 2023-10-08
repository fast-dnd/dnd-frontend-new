import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { IPlayer, IRoomDetail } from "@/types/room";

import { gameStore, PlayerChanges } from "../stores/game-store";

const useHandlePlayerChanges = ({ roomData }: { roomData?: IRoomDetail }) => {
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();

  const accountId = useReadLocalStorage<string>("accountId");

  useEffect(() => {
    if (roomData) {
      const player = roomData.playerState.find((player) => player.accountId === accountId);
      if (currentPlayer && player) {
        // TODO: make this more readable (extract to function)
        const changes: PlayerChanges = {};
        if (player.health !== currentPlayer.health) {
          if (currentPlayer.health > player.health) {
            changes.lostHealth = true;
          } else {
            changes.gainedHealth = true;
          }
        }
        if (player.mana !== currentPlayer.mana) {
          changes.gainedMana = true;
        }
        if (player.bonusForNextRound !== currentPlayer.bonusForNextRound) {
          changes.gainedBonus = true;
        }
        if (player.gold !== currentPlayer.gold) {
          changes.gainedGold = true;
        }
        if (changes.lostHealth && player.health <= 0) gameStore.dying.set(true);
        if (Object.keys(changes).length) {
          gameStore.changes.set(changes);
          const removeChangesTimeout = setTimeout(() => {
            gameStore.changes.set({});
            if (changes.lostHealth && player.health <= 0) {
              gameStore.dying.set(false);
              gameStore.diedModal.set(true);
            }
          }, 1500);

          return () => {
            clearTimeout(removeChangesTimeout);
          };
        }
      }
      setCurrentPlayer(player);
    }
  }, [accountId, currentPlayer, roomData]);

  return { currentPlayer };
};

export default useHandlePlayerChanges;
