import { useEffect, useState } from "react";

import { IRoomDetail } from "@/types/room";

import { gameStore } from "../stores/game-store";

const useHandleGameStateChange = ({ roomData }: { roomData?: IRoomDetail }) => {
  const [gaming, setGaming] = useState(true);

  useEffect(() => {
    if (roomData) {
      if (roomData.state === "WIN" || roomData.state === "LOSE") {
        if (gaming) {
          setGaming(false);
          gameStore.gameOverModal.set(true);
        }
      }
    }
  }, [gaming, roomData]);
};

export default useHandleGameStateChange;
