import { useEffect, useState } from "react";

import { IPlayer, IRoomDetail } from "@/types/room";

import { moveStore } from "../stores/move-store";

const usePlayMove = (roomData: IRoomDetail, currentPlayer: IPlayer, loadingText: boolean) => {
  const [timer, setTimer] = useState(0);

  const powerup = moveStore.powerup.use();
  const buttonState = moveStore.buttonState.use();

  useEffect(() => {
    if ((currentPlayer.mana || 0) < powerup) {
      moveStore.powerup.set(0);
    }
    if ((currentPlayer.health || 0) <= 0) moveStore.canPlay.set(false);
    if (loadingText) {
      setTimer(0);
    } else if (roomData.roundEndsAt) {
      const endsAt = new Date(roomData.roundEndsAt);
      setTimer(Math.max(Math.floor((endsAt.getTime() - new Date().getTime()) / 1000), 0));
    }
    if (roomData.queuedMoves && roomData.queuedMoves.length > 0) {
      const currentPlayerMove = roomData.queuedMoves.find(
        (move) => move.playerAccountId === currentPlayer.accountId,
      );
      if (currentPlayerMove) {
        moveStore.canPlay.set(false);
      }
    } else if (!loadingText && buttonState !== "ROLLING") {
      moveStore.canPlay.set(true);
      moveStore.buttonState.set("CANPLAY");
    }
    if (roomData.state === "WIN" || roomData.state === "LOSE") moveStore.canPlay.set(false);
  }, [buttonState, currentPlayer, loadingText, powerup, roomData]);

  useEffect(() => {
    const interval = setInterval(() => {
      timer > 0 && !loadingText && setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [loadingText, timer]);

  const timeToDisplay = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${("0" + seconds).slice(-2)}`;
  };

  return { timeToDisplay };
};
export default usePlayMove;
