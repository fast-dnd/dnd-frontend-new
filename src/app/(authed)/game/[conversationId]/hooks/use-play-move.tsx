import { useEffect, useState } from "react";

import { IPlayMove } from "@/types/game";
import { IPlayer, IRoomDetail } from "@/types/room";

import { gameStore } from "../stores/game-store";
import { moveStore } from "../stores/move-store";
import { generateDice, generateRandomDice } from "../utils/dice";
import useSubmitMove from "./use-submit-move";

const usePlayMove = (conversationId: string, roomData: IRoomDetail, currentPlayer: IPlayer) => {
  const [openedDetails, setOpenedDetails] = useState(false);

  const loadingText = gameStore.loadingText.use();
  const { mutate: submitMove, isLoading: submitting } = useSubmitMove();
  const store = moveStore.use();

  useEffect(() => {
    if (submitting) {
      const timeout = setTimeout(() => moveStore.dice.set(generateRandomDice()), 200);

      return () => clearTimeout(timeout);
    }
  }, [submitting]);

  useEffect(() => {
    if ((currentPlayer.mana || 0) < store.powerup) {
      moveStore.powerup.set(0);
    }
    if ((currentPlayer.health || 0) <= 0) moveStore.canPlay.set(false);

    if (roomData.queuedMoves && roomData.queuedMoves.length > 0) {
      const currentPlayerMove = roomData.queuedMoves.find(
        (move) => move.playerAccountId === currentPlayer.accountId,
      );
      if (currentPlayerMove) {
        moveStore.canPlay.set(false);
      }
    } else if (!loadingText && store.buttonState !== "ROLLING") {
      moveStore.canPlay.set(true);
      moveStore.buttonState.set("DEFAULT");
    }
    if (roomData.state === "WIN" || roomData.state === "LOSE") moveStore.canPlay.set(false);
  }, [currentPlayer, loadingText, roomData, store.buttonState, store.powerup]);

  const onPlay = () => {
    const moveToPlay: IPlayMove = {
      conversationId,
      mana: store.powerup,
      moveType: store.move ?? "free_will",
      message: store.move ? "" : store.freeWill,
      playerId: currentPlayer.accountId,
    };

    if (moveToPlay) {
      moveStore.buttonState.set("ROLLING");
      moveStore.roll.set(undefined);
      moveStore.aiDescription.set(undefined);
      moveStore.canPlay.set(false);
      setOpenedDetails(false);
      submitMove(moveToPlay, {
        onSuccess: (res) => {
          moveStore.freeWill.set("");
          moveStore.roll.set(res);
          const rollTimeout = setTimeout(() => moveStore.buttonState.set("ROLLED"), 1500);
          const diceTimeout = setTimeout(
            () => moveStore.dice.set(generateDice(res.diceAfterBonus)),
            250,
          );

          return () => {
            clearTimeout(rollTimeout);
            clearTimeout(diceTimeout);
          };
        },
        onError: () => {
          moveStore.buttonState.set("DEFAULT");
          moveStore.canPlay.set(true);
        },
      });
    }
  };

  return { onPlay, submitting, openedDetails, setOpenedDetails };
};
export default usePlayMove;
