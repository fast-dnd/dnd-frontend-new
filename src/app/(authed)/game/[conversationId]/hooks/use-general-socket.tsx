import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IGeneralSocketEvent } from "../types/events";
import { socketIO } from "@/lib/socket";
import { IMove, IQuestion } from "@/services/room-service";

const useGeneralSocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [canAsk, setCanAsk] = useState(true);
  const [questionAsked, setQuestionAsked] = useState<Partial<IQuestion>>();

  useEffect(() => {
    const onEvent = (event: IGeneralSocketEvent) => {
      switch (event.event) {
        case "DM_ANSWERED_QUESTION":
          setCanAsk(false);
          setQuestionAsked({
            ...questionAsked,
            question: event.data.question,
            bob3Answer: event.data.answer,
          });
          break;
        case "PLAYER_ASKED_QUESTION":
          setCanAsk(false);
          setQuestionAsked({
            ...questionAsked,
            question: event.data.question,
            playerAccountId: event.data.accountId,
          });
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

  return { canAsk, setCanAsk, questionAsked, setQuestionAsked };
};

export default useGeneralSocket;
