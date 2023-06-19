import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IGeneralSocketEvent } from "../types/events";
import { socketIO } from "@/lib/socket";

const useGeneralSocket = (conversationId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onEvent = (event: IGeneralSocketEvent) => {
      switch (event.event) {
        case "DM_ANSWERED_QUESTION":
        case "PLAYER_ASKED_QUESTION":
        case "PLAYER_MOVE":
          queryClient.refetchQueries(["room", conversationId]);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, queryClient]);

  return {};
};

export default useGeneralSocket;
