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

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "ROUND_STORY_CHUNK":
          setLastStory(`${lastStory}${event.data.chunk}`);
          setCanPlay(false);
          break;
        case "REQUEST_SENT_TO_DM":
          queryClient.setQueryData(["room", conversationId], event.data);
          setCanPlay(false);
          break;
        case "ROUND_STORY":
          setCanPlay(true);
          setMove(undefined);
        case "GAME_ENDED":
          queryClient.refetchQueries(["room", conversationId]).then(() => setLastStory(""));
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [canPlay, conversationId, lastStory, queryClient]);

  return { canPlay, setCanPlay, lastStory, move, setMove };
};

export default useGameplaySocket;
