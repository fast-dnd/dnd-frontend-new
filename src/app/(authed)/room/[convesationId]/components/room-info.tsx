"use client";

import { Box } from "@/components/ui/box";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const players = [
  {
    id: "1",
    name: "Player 1",
    champion: "Warrior",
  },
  {
    id: "2",
    name: "Player 2",
    champion: "Mage",
  },
  {
    id: "3",
    name: "Player 3",
    champion: "Ranger",
  },
];

const roomId = 12345678901234567890;

const RoomInfo = () => {
  const [copied, setCopied] = React.useState(false);

  const onCopyRoomId = () => {
    navigator.clipboard.writeText(roomId.toString());
    setCopied(true);
  };

  return (
    <Box title="ROOM" className="flex flex-col gap-8 min-h-0 flex-1 w-[490px] p-8">
      <p className="font-semibold text-2xl">PLAYERS</p>
      <div className="flex flex-col gap-4">
        {players.map((player) => (
          <div key={player.id} className="flex flex-row gap-6">
            <Image
              src="/images/bg-cover.png"
              width={64}
              height={64}
              alt={`player-${player.id}-avatar`}
              className="w-16 h-16"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl">{player.name}</p>
              <p className="text-xl font-light">{player.champion}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full border-t border-white/20" />
      <p className="mt-2 text-2xl text-center">{roomId}</p>
      <Button onClick={onCopyRoomId} variant={copied ? "primary" : "outline"} className="uppercase">
        {copied ? "Copied" : "Copy room id"}
      </Button>
    </Box>
  );
};

export default RoomInfo;
