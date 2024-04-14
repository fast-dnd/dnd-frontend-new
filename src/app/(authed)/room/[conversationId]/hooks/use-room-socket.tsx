import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { socketIO } from "@/lib/socket";
import { roomKey } from "@/services/room-service";
import { IChampion } from "@/types/dungeon";
import { roomDetailSchema } from "@/validations/room";

import {
  gameStore,
  getInitialGameStoreData,
} from "@/app/(authed)/game/[conversationId]/stores/game-store";
import {
  getInitialMoveStoreData,
  moveStore,
} from "@/app/(authed)/game/[conversationId]/stores/move-store";

import { IRoomSocketEvent } from "../types/events";

const useRoomSocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [customChampion, setCustomChampion] = useLocalStorage<IChampion | null>(
    "customChampion",
    null,
  );

  const router = useRouter();

  const [gameStarting, setGameStarting] = useState(false);

  useEffect(() => {
    const onEvent = (event: IRoomSocketEvent) => {
      switch (event.event) {
        case "PLAYER_JOINED_ROOM":
        case "PLAYER_EDIT":
        case "ROOM_SETTINGS_CHANGED":
          queryClient.setQueryData([roomKey, conversationId], roomDetailSchema.parse(event.data));
          break;
        case "REQUEST_SENT_TO_DM":
          setGameStarting(true);
          break;
        case "GAME_STARTED":
          moveStore.set(getInitialMoveStoreData());
          gameStore.set(getInitialGameStoreData());
          router.push(`/game/${conversationId}`);
          setCustomChampion(null);
          break;
      }
    };
    socketIO.on(conversationId, onEvent);

    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, queryClient, router, setCustomChampion]);

  return { gameStarting };
};

export default useRoomSocket;
