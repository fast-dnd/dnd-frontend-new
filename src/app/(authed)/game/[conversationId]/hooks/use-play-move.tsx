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
        setOpenedDetails(false);
      }
    } else if (!loadingText && store.buttonState !== "ROLLING") {
      moveStore.canPlay.set(true);
    }
    if (roomData.state === "WIN" || roomData.state === "LOSE") moveStore.canPlay.set(false);
  }, [currentPlayer, loadingText, roomData, store.buttonState, store.powerup]);

  const onPlay = () => {
    console.log({ store });

    const moveToPlay: IPlayMove = {
      conversationId,
      mana: store.powerup,
      moveType: store.move ?? "free_will",
      message: store.move
        ? ""
        : store.wordsChallenge.length > 0
        ? store.wordsChallenge.join(" ")
        : store.freeWill,
      playerId: currentPlayer.accountId,
    };

    if (moveToPlay) {
      moveStore.buttonState.set("ROLLING");
      const interval = setInterval(() => moveStore.randomDice.set(generateRandomDice()), 200);

      moveStore.roll.set(undefined);
      moveStore.aiDescription.set(undefined);
      moveStore.canPlay.set(false);
      setOpenedDetails(false);
      submitMove(moveToPlay, {
        onSuccess: (res) => {
          moveStore.freeWill.set("");
          moveStore.wordsChallenge.set([]);
          moveStore.roll.set(res);
          moveStore.dice.set(generateDice(res.diceAfterBonus));

          const rollTimeout = setTimeout(() => {
            moveStore.buttonState.set("ROLLED");
            clearInterval(interval);
          }, 500);

          const breakdownTimeout = setTimeout(() => {
            moveStore.buttonState.set("DEFAULT");
          }, 1500);

          return () => {
            clearTimeout(rollTimeout);
            clearTimeout(breakdownTimeout);
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
