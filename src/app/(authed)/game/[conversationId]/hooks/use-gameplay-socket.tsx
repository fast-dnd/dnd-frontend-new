import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { roomKey } from "@/services/room-service";
import { socketIO } from "@/lib/socket";

import { IGameplaySocketEvent } from "../types/events";

const useGameplaySocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [lastStory, setLastStory] = useState<string>("");
  const [loadingText, setLoadingText] = useState(false);

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "ROUND_STORY_CHUNK":
          setLastStory(`${lastStory}${event.data.chunk}`);
          setLoadingText(true);
          break;
        case "REQUEST_SENT_TO_DM":
          queryClient.setQueryData([roomKey, conversationId], event.data);
          setLoadingText(true);
          break;
        case "ROUND_STORY":
        case "GAME_ENDED":
          queryClient.refetchQueries([roomKey, conversationId]).then(() => {
            setLastStory("");
            setLoadingText(false);
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
    loadingText,
  };
};

export default useGameplaySocket;
