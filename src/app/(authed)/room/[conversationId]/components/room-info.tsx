"use client";

import { Box } from "@/components/ui/box";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import useGetRoomData from "@/hooks/use-get-room-data";

const RoomInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const [copied, setCopied] = React.useState(false);

  const { data: roomData } = useGetRoomData(conversationId);

  if (!roomData) {
    return (
      <Box
        title="ROOM"
        className="flex flex-col items-center justify-center gap-8 min-h-0 flex-1 w-[490px] p-8"
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
    <Box title="ROOM" className="flex flex-col gap-8 min-h-0 flex-1 w-[490px] p-8">
      <p className="font-semibold text-2xl">PLAYERS</p>
      <div className="flex flex-col gap-4">
        {roomData.playerState.map((player) => (
          <div key={player.accountId} className="flex flex-row gap-6">
            <Image
              src="/images/bg-cover.png"
              width={64}
              height={64}
              alt={`player-${player.accountId}-avatar`}
              className="w-16 h-16"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl">{player.name}</p>
              <p className="text-xl font-light">{player.champion?.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full border-t border-white/20" />
      <p className="mt-2 text-2xl text-center">{roomData.link}</p>
      <Button onClick={onCopyRoomId} variant={copied ? "primary" : "outline"} className="uppercase">
        {copied ? "Copied" : "Copy room id"}
      </Button>
    </Box>
  );
};

export default RoomInfo;
