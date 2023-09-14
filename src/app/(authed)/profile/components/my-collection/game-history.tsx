import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "iconsax-react";

import useGetRoomHistory from "@/hooks/use-get-room-history";

const GameHistory = () => {
  const { data: rooms, isLoading } = useGetRoomHistory();

  if (isLoading) return <div>Loading...</div>;

  if (!rooms) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col gap-6">
      <p className="uppercase">Games played: {rooms.total}</p>
      <div className="flex flex-col gap-4">
        {rooms.rooms.map((room) => (
          <div
            key={room.conversationId}
            className="flex w-full items-center justify-between gap-4 rounded-md transition-colors duration-300 hover:bg-white/10"
          >
            <Image
              src={room.dungeon.imageUrl || "/images/default-dungeon.png"}
              alt={"Game"}
              width={80}
              height={80}
              className="h-20"
            />
            <div className="flex flex-1 flex-col justify-center gap-3">
              <p className="font-bold">{room.dungeon.name}</p>
              {room.state}
              <p className="text-sm uppercase text-white/50">FINISHED</p>
            </div>

            <Link href={`/transcript/${room.conversationId}`} aria-label="Transcript">
              <Book variant="Bold" size={40} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;

const roomStateColorMap = {
  CREATING: "bg-yellow-500",
  GAMING: "bg-green-500",
  CLOSED: "bg-red-500",
};
