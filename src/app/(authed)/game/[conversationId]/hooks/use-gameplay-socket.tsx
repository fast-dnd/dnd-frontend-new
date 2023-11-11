import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socketIO } from "@/lib/socket";
import { roomKey } from "@/services/room-service";
import { roomDetailSchema } from "@/validations/room";

import { gameStore } from "../stores/game-store";
import { IGameplaySocketEvent } from "../types/events";

const useGameplaySocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [lastStory, setLastStory] = useState("");

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "ROUND_STORY_CHUNK":
          setLastStory(`${lastStory}${event.data.chunk}`);
          gameStore.loadingText.set(true);
          break;
        case "REQUEST_SENT_TO_DM":
          if (event.data)
            queryClient.setQueryData([roomKey, conversationId], roomDetailSchema.parse(event.data));
          gameStore.loadingText.set(true);
          break;
        case "ROUND_STORY":
        case "GAME_ENDED":
          queryClient.refetchQueries([roomKey, conversationId]).then(() => {
            setLastStory("");
            gameStore.loadingText.set(false);
          });
          break;
      }
    };
    socketIO.on(conversationId, onEvent);

    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, lastStory, queryClient]);

  return {
    lastStory,
  };
};

export default useGameplaySocket;
