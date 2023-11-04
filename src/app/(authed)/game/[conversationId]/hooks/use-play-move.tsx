import { useEffect } from "react";

import { IPlayer, IRoomDetail } from "@/types/room";

import { moveStore } from "../stores/move-store";

const usePlayMove = (roomData: IRoomDetail, currentPlayer: IPlayer, loadingText: boolean) => {
  const powerup = moveStore.powerup.use();
  const buttonState = moveStore.buttonState.use();

  useEffect(() => {
    if ((currentPlayer.mana || 0) < powerup) {
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
    } else if (!loadingText && buttonState !== "ROLLING") {
      moveStore.canPlay.set(true);
      moveStore.buttonState.set("CANPLAY");
    }
    if (roomData.state === "WIN" || roomData.state === "LOSE") moveStore.canPlay.set(false);
  }, [buttonState, currentPlayer, loadingText, powerup, roomData]);
};
export default usePlayMove;
