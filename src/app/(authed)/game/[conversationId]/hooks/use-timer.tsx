import { useEffect, useState } from "react";

import { IRoomDetail } from "@/types/room";

import { gameStore } from "../stores/game-store";

const useTimer = (roomData?: IRoomDetail) => {
  const loadingText = gameStore.loadingText.use();

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (loadingText) {
      setTimer(0);
    } else if (roomData?.roundEndsAt) {
      const endsAt = new Date(roomData.roundEndsAt);
      setTimer(Math.max(Math.floor((endsAt.getTime() - new Date().getTime()) / 1000), 0));
    }
  }, [loadingText, roomData]);

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
export default useTimer;
