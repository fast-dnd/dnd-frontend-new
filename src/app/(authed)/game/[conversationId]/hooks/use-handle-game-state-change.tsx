import { useEffect, useState } from "react";

import { IGameState, IRoomDetail } from "@/types/room";

import { gameStore } from "../stores/game-store";

const useHandleGameStateChange = ({ roomData }: { roomData?: IRoomDetail }) => {
  const [previousState, setPreviousState] = useState<IGameState>();

  useEffect(() => {
    if (roomData) {
      if (
        !!previousState &&
        previousState !== roomData.state &&
        (roomData.state === "WIN" || roomData.state === "LOSE")
      ) {
        gameStore.gameOverModal.set(true);
      }

      setPreviousState(roomData.state);
    }
  }, [previousState, roomData]);
};

export default useHandleGameStateChange;
