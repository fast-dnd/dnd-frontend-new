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
      )
        setTimeout(() => {
          if (gameStore.pageState.get() === "DEFAULT") gameStore.pageState.set("GAMEOVER");
        }, 1500);

      setPreviousState(roomData.state);
    }
  }, [previousState, roomData]);
};

export default useHandleGameStateChange;
