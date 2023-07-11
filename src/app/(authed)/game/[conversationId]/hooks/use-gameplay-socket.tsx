import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { DefaultMove } from "@/types/dnd";
import { socketIO } from "@/lib/socket";

import { IGameplaySocketEvent } from "../types/events";

const useGameplaySocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [canPlay, setCanPlay] = useState(true);
  const [lastStory, setLastStory] = useState<string>("");
  const [move, setMove] = useState<DefaultMove>();
  const [loadingText, setLoadingText] = useState(false);
  const [rollButtonState, setRollButtonState] = useState<"CANPLAY" | "ROLLING" | "ROLLED">(
    "CANPLAY",
  );

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "ROUND_STORY_CHUNK":
          setLastStory(`${lastStory}${event.data.chunk}`);
          setCanPlay(false);
          setLoadingText(true);
          break;
        case "REQUEST_SENT_TO_DM":
          queryClient.setQueryData(["room", conversationId], event.data);
          setCanPlay(false);
          setLoadingText(true);
          break;
        case "ROUND_STORY":
          setRollButtonState("CANPLAY");
          setCanPlay(true);
          setMove(undefined);
          queryClient.refetchQueries(["room", conversationId]).then(() => {
            setLastStory("");
            setLoadingText(false);
          });
          break;
        case "GAME_ENDED":
          setMove(undefined);
          setRollButtonState("ROLLED");
          queryClient.refetchQueries(["room", conversationId]).then(() => {
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
  }, [canPlay, conversationId, lastStory, queryClient]);

  return {
    canPlay,
    setCanPlay,
    lastStory,
    move,
    setMove,
    loadingText,
    rollButtonState,
    setRollButtonState,
  };
};

export default useGameplaySocket;
