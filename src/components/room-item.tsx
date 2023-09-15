import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book, Play } from "iconsax-react";

import { IRoom } from "@/types/room";

const RoomItem = React.forwardRef<
  HTMLDivElement,
  {
    room: IRoom;
  }
>(({ room }, ref) => {
  const roomState = roomStateMap(room.state, room.turn);

  return (
    <div
      key={room.conversationId}
      className="flex w-full items-center justify-between gap-4 rounded-md transition-colors duration-300 hover:bg-white/10"
      ref={ref}
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
        <p className={`text-sm uppercase ${roomState.color}`}>{roomState.text}</p>
      </div>

      <Link href={`/transcript/${room.conversationId}`} aria-label="Transcript">
        {roomState.text.includes("IN PROGRESS") ? (
          <Play variant="Bold" size={40} color="#FF5A5A" />
        ) : (
          <Book variant="Bold" size={40} />
        )}
      </Link>
    </div>
  );
});

RoomItem.displayName = "RoomItem";

export default RoomItem;

const roomStateMap = (roomState: string, turn: number) => {
  switch (roomState) {
    case "CREATING":
      return {
        text: "IN PROGRESS (CREATING)",
        color: "text-primary",
      };
    case "GAMING":
      return {
        text: `IN PROGRESS (TURN ${turn})`,
        color: "text-primary",
      };
    case "WIN":
      return {
        text: "VICTORY",
        color: "text-info",
      };
    case "LOSE":
      return {
        text: "DEFEAT",
        color: "text-white/50",
      };
    default:
      return {
        text: "IN PROGRESS",
        color: "text-primary",
      };
  }
};
