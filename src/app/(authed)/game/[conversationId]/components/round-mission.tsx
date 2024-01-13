"use client";

import React from "react";

import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { jibril } from "@/utils/fonts";

const RoundMission = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);

  return (
    <div className="flex w-full flex-col bg-white/[0.03] pt-2 max-lg:rounded-md lg:bg-primary-900 lg:pt-4">
      <div className="flex items-center">
        <div className="h-[1px] w-full bg-black shadow-lobby" />
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />
          <p className="mt-1 text-lg uppercase tracking-widest text-primary" style={jibril.style}>
            QUESTS
          </p>
          <div className="h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />
        </div>
        <div className="h-[1px] w-full bg-black shadow-lobby" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        {dungeonData ? (
          <p className="text-sm leading-tight lg:font-semibold">
            {/* TODO: just need last, wait for backend */}
            {dungeonData.locations.at(-1)?.mission}
          </p>
        ) : (
          <div className="flex h-6 w-72 animate-pulse rounded-md bg-gray-500" />
        )}
        <div className="w-fit whitespace-nowrap rounded-full bg-white/[16%] px-2 py-1 text-xs">
          If accomplished final score will be higher.
        </div>
      </div>
    </div>
  );
};

export default RoundMission;
