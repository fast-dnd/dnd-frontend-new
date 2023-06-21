"use client";

import { Box } from "@/components/ui/box";
import React, { Fragment } from "react";
import { Button } from "@/components/ui/button";
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
        className="flex flex-col items-center justify-center gap-8 min-h-0 flex-1 w-[490px] p-8"
      >
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  return (
    <Box title="ROOM" className="flex flex-col gap-8 min-h-0 flex-1 w-[490px] p-8">
      <div className="flex flex-row items-center gap-4 pr-0">
        <Image
          src={dungeonData.imageUrl || "/images/bg-cover.png"}
          alt={dungeonData.name}
          width={100}
          height={100}
          className="h-[100px]"
        />
        <div className="flex flex-col gap-4">
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
