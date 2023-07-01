"use client";

import { Box } from "@/components/ui/box";
import React from "react";
import Spinner from "@/components/ui/spinner";
import useGetRoomData from "@/hooks/use-get-room-data";
import Player from "./player";
import Image from "next/image";
import useGetDungeon from "@/hooks/use-get-dungeon";

const RoomInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);

  if (!roomData || !dungeonData) {
    return (
      <Box
        title="ROOM"
        className="flex flex-col items-center justify-center gap-8 min-h-0 flex-1 w-[350px] md:w-[490px] p-8"
      >
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  return (
    <Box
      title="ROOM"
      className="flex flex-col min-h-0 flex-1 md:w-[490px] p-5 gap-5 md:p-8 md:gap-8"
    >
      <div className="flex flex-row gap-4 pr-0">
        <Image
          src={dungeonData.imageUrl || "/images/default-dungeon.png"}
          alt={dungeonData.name}
          width={100}
          height={100}
          className="h-[100px]"
        />
        <div className="flex flex-col max-h-[150px] gap-4 overflow-y-auto">
          <p className="text-xl font-semibold">{dungeonData.name}</p>
          <p>{dungeonData.description}</p>
        </div>
      </div>
      <p className="font-semibold text-2xl">PLAYERS</p>
      <div className="flex flex-col flex-1 min-h-0 gap-4 overflow-y-auto">
        {roomData.playerState.map((player) => (
          <Player key={player.accountId} player={player} />
        ))}
      </div>
    </Box>
  );
};

export default RoomInfo;
