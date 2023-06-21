import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IGameplaySocketEvent } from "../types/events";
import { socketIO } from "@/lib/socket";
import { DefaultMove } from "@/types/dnd";

const useGameplaySocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [canPlay, setCanPlay] = useState(true);
  const [lastStory, setLastStory] = useState<string>("");
  const [move, setMove] = useState<DefaultMove>();
  const [diceTotal, setDiceTotal] = useState(0);

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "ROUND_STORY_CHUNK":
          setLastStory(`${lastStory}${event.data.chunk}`);
          if (canPlay) setCanPlay(false);
          break;
        case "REQUEST_SENT_TO_DM":
          queryClient.setQueryData(["room", conversationId], event.data);
          setCanPlay(false);
          break;
        case "GAME_ENDED":
          queryClient.setQueryData(["room", conversationId], event.data);
          setLastStory("");
          break;
        case "ROUND_STORY":
          queryClient.setQueryData(["room", conversationId], event.data);
          setCanPlay(true);
          setLastStory("");
          setMove(undefined);
          setDiceTotal(0);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [canPlay, conversationId, lastStory, queryClient]);

  return { canPlay, setCanPlay, lastStory, move, setMove, diceTotal, setDiceTotal };
};

export default useGameplaySocket;
