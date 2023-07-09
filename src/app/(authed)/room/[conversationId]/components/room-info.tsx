"use client";

import { Box } from "@/components/ui/box";
import React from "react";
import Spinner from "@/components/ui/spinner";
import useGetRoomData from "@/hooks/use-get-room-data";
import Player from "./player";
import Image from "next/image";
import useGetDungeon from "@/hooks/use-get-dungeon";
import { Button } from "@/components/ui/button";
import useCopy from "@/hooks/use-copy";

const RoomInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);

  const [copied, setCopied] = useCopy();

  if (!roomData || !dungeonData) {
    return (
      <Box
        title="ROOM"
        className="flex flex-col items-center justify-center gap-8 min-h-0 flex-1 w-full md:w-[490px] p-8"
      >
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  const onCopyRoomId = () => {
    navigator.clipboard.writeText(roomData.link);
    setCopied(true);
  };

  return (
    <Box
      title="ROOM"
      className="flex flex-col min-h-0 flex-1 lg:w-[490px] p-5 gap-5 lg:p-8 lg:gap-8"
      wrapperClassName="block w-[90%] md:w-[490px] mx-auto"
    >
      <div className="flex text-center flex-col lg:flex-row justify-between gap-4">
        <p className="mt-2 text-xl flex-1 whitespace-nowrap">{roomData.link}</p>
        <Button
          onClick={onCopyRoomId}
          variant={copied ? "primary" : "outline"}
          className="uppercase text-lg w-full lg:w-fit px-8 whitespace-nowrap"
        >
          {copied ? "Copied" : "Copy ID"}
        </Button>
      </div>

      <div className="w-full border-t border-white/20" />

      <p className="text-lg lg:text-2xl leading-7 tracking-[3.3px] font-semibold uppercase">
        {dungeonData.name}
      </p>
      <div className="flex flex-row gap-6 pr-0">
        <Image
          src={dungeonData.imageUrl || "/images/default-dungeon.png"}
          alt={dungeonData.name}
          width={100}
          height={100}
          className="h-[70px] w-[70px] lg:h-[100px] lg:w-[100px]"
        />
        <p className="text-sm lg:text-lg font-light leading-7 tracking-widest line-clamp-3">
          {dungeonData.description}
        </p>
      </div>
      <p className="text-lg lg:text-2xl leading-7 tracking-[3.3px] font-semibold uppercase">
        PLAYERS
      </p>
      <div className="flex flex-col flex-1 min-h-0 gap-4 overflow-y-auto">
        {roomData.playerState.map((player) => (
          <Player key={player.accountId} player={player} />
        ))}
      </div>
    </Box>
  );
};

export default RoomInfo;
