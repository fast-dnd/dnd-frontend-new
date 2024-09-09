"use client";

import { Tooltip } from "@/components/ui/tooltip";
import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { jibril } from "@/utils/fonts";

const RoundMission = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);

  return (
    <div className="flex w-full flex-col rounded-lg bg-white/[0.03] pt-2 max-lg:rounded-md lg:bg-primary-900 lg:pt-4">
      <div className="flex items-center">
        <div className="h-[1px] w-full bg-black shadow-lobby" />
        <div className="flex items-center gap-2">
          <div className="size-1.5 shrink-0 rotate-45 bg-primary" />
          <p className="mt-1 text-xl uppercase tracking-widest text-primary" style={jibril.style}>
            NOTE/DIRECTION
          </p>
          <div className="size-1.5 shrink-0 rotate-45 bg-primary" />
        </div>
        <div className="h-[1px] w-full bg-black shadow-lobby" />
      </div>
      <div className="flex flex-col gap-2 p-3">
        {roomData ? (
          <Tooltip
            content="Your score will increase with each fulfilled quest."
            contentClassName="p-4 w-[270px] whitespace-normal"
          >
            <p className="text-lg leading-tight lg:font-semibold">{roomData.location.mission}</p>
          </Tooltip>
        ) : (
          <div className="flex h-6 w-72 animate-pulse rounded-md bg-gray-500" />
        )}
      </div>
    </div>
  );
};

export default RoundMission;
