import { useEffect, useState } from "react";

import { socketIO } from "@/lib/socket";
import { IDefaultMove } from "@/types/room";

import { IGameplaySocketEvent } from "../types/events";

const useGameplaySocket = (conversationId: string) => {
  const [canPlay, setCanPlay] = useState(true);
  const [move, setMove] = useState<IDefaultMove>();
  const [rollButtonState, setRollButtonState] = useState<"CANPLAY" | "ROLLING" | "ROLLED">(
    "CANPLAY",
  );

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "GAME_ENDED":
          setMove(undefined);
          setRollButtonState("ROLLED");
        case "ROUND_STORY_CHUNK":
        case "REQUEST_SENT_TO_DM":
          setCanPlay(false);
          break;
        case "ROUND_STORY":
          setRollButtonState("CANPLAY");
          setCanPlay(true);
          setMove(undefined);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId]);

  return {
    canPlay,
    setCanPlay,
    move,
    setMove,
    rollButtonState,
    setRollButtonState,
  };
};

export default useGameplaySocket;
