import { useEffect } from "react";

import { socketIO } from "@/lib/socket";

import { moveStore } from "../stores/move-store";
import { IGameplaySocketEvent } from "../types/events";

const usePlayMoveSocket = (conversationId: string) => {
  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "GAME_ENDED":
          moveStore.buttonState.set("ROLLED");
        case "ROUND_STORY_CHUNK":
        case "REQUEST_SENT_TO_DM":
          moveStore.canPlay.set(false);
          break;
        case "ROUND_STORY":
          moveStore.canPlay.set(true);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId]);
};

export default usePlayMoveSocket;
