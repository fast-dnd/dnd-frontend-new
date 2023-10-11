import { useEffect } from "react";

import { socketIO } from "@/lib/socket";

import { moveStore } from "../stores/move-store";
import { IGameplaySocketEvent } from "../types/events";

const useGameplaySocket = (conversationId: string) => {
  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "GAME_ENDED":
          moveStore.move.set(undefined);
          moveStore.buttonState.set("ROLLED");
        case "ROUND_STORY_CHUNK":
        case "REQUEST_SENT_TO_DM":
          moveStore.canPlay.set(false);
          break;
        case "ROUND_STORY":
          moveStore.buttonState.set("CANPLAY");
          moveStore.canPlay.set(true);
          moveStore.move.set(undefined);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId]);
};

export default useGameplaySocket;
