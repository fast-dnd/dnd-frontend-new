import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { IQuestion } from "@/services/room-service";
import { socketIO } from "@/lib/socket";

import { IGeneralSocketEvent } from "../types/events";

const useGeneralSocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [canAsk, setCanAsk] = useState(true);
  const [questionAsked, setQuestionAsked] = useState<Partial<IQuestion>>();
  const [asking, setAsking] = useState(false);
  useEffect(() => {
    const onEvent = (event: IGeneralSocketEvent) => {
      switch (event.event) {
        case "PLAYER_ASKED_QUESTION":
          setCanAsk(false);
          setQuestionAsked({
            ...questionAsked,
            question: event.data.question,
            playerAccountId: event.data.accountId,
            playerName: event.data.player.name,
          });
          break;
        case "DM_ANSWERED_QUESTION":
          setCanAsk(false);
          setAsking(false);
          setQuestionAsked({
            ...questionAsked,
            question: event.data.question,
            bob3Answer: event.data.answer,
          });
          queryClient.invalidateQueries(["room", conversationId]);
          break;

        case "PLAYER_MOVE":
          queryClient.refetchQueries(["room", conversationId]);
          break;
        case "ROUND_STORY":
          setCanAsk(true);
          queryClient.invalidateQueries(["room", conversationId]);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, queryClient, questionAsked]);

  return { canAsk, setCanAsk, questionAsked, setQuestionAsked, asking, setAsking };
};

export default useGeneralSocket;
