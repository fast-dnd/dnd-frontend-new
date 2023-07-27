import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { roomDataSchema } from "@/types/room";
import { roomKey } from "@/services/room-service";
import { socketIO } from "@/lib/socket";

import { IRoomSocketEvent } from "../types/events";

const useRoomSocket = (conversationId: string) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [gameStarting, setGameStarting] = useState(false);

  useEffect(() => {
    const onEvent = (event: IRoomSocketEvent) => {
      switch (event.event) {
        case "PLAYER_JOINED_ROOM":
        case "PLAYER_EDIT":
        case "ROOM_SETTINGS_CHANGED":
          queryClient.setQueryData([roomKey, conversationId], roomDataSchema.parse(event.data));
          break;
        case "REQUEST_SENT_TO_DM":
          setGameStarting(true);
          break;
        case "GAME_STARTED":
          router.push(`/game/${conversationId}`);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);

    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, queryClient, router]);

  return { gameStarting };
};

export default useRoomSocket;
