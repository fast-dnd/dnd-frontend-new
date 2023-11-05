import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { IPlayer } from "@/types/room";

const useGetCurrentPlayer = (conversationId: string) => {
  const { data: roomData } = useGetRoomData(conversationId);

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();

  const accountId = useReadLocalStorage<string>("accountId");

  useEffect(() => {
    if (roomData) {
      setCurrentPlayer(roomData.playerState.find((player) => player.accountId === accountId));
    }
  }, [accountId, roomData]);

  return { currentPlayer };
};

export default useGetCurrentPlayer;
