import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book1, Play } from "iconsax-react";

import { IRoom } from "@/types/room";
import { cn } from "@/utils/style-utils";

import {
  gameStore,
  getInitialGameStoreData,
} from "@/app/(authed)/game/[conversationId]/stores/game-store";
import {
  getInitialMoveStoreData,
  moveStore,
} from "@/app/(authed)/game/[conversationId]/stores/move-store";

import OraCommunityBattlesPromptModal from "./ora-network-modal/community-battle-modal";

const RoomItem = React.forwardRef<
  HTMLDivElement,
  {
    room: IRoom;
  }
>(({ room }, ref) => {
  const roomState = roomStateMap(room.state, room.turn);
  return (
    <div
      className={cn(
        "glass-effect",
        "flex w-full items-center justify-between gap-4 rounded-md bg-dark-900 p-0 pr-2 transition-colors duration-300 hover:bg-white/10 max-lg:bg-black lg:p-2",
      )}
      // style={{
      //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E")`,
      // }}
      key={room.conversationId}
      ref={ref}
    >
      <Image
        src={room.dungeon.imageUrl || "/images/default-dungeon.png"}
        alt={"Game"}
        width={80}
        height={80}
        className="h-20 rounded-md"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
        <p className="truncate font-bold">{room.dungeon.name}</p>
        <p className={`text-sm uppercase ${roomState.color}`}>{roomState.text}</p>
      </div>

      <OraCommunityBattlesPromptModal
        conversationId={room.conversationId}
        aiJudgeQuery={room.aiJudgeQuery}
        aiJudgeQueryNormalized={room.aiJudgeQueryNormalized}
        aiJudgeProcessedQuery={
          room.aiJudgeQueryTxHash != null && room.aiJudgeQueryTxHash != undefined
        }
        roomState={room.state}
      />
      {roomState.text.includes("IN PROGRESS") ? (
        <Link
          onClick={() => {
            moveStore.set(getInitialMoveStoreData());
            gameStore.set(getInitialGameStoreData());
          }}
          href={`/${roomState.text.includes("CREATING") ? "room" : "game"}/${room.conversationId}`}
          aria-label="Transcript"
        >
          <Play variant="Bold" size={40} color="#FF5A5A" />
        </Link>
      ) : (
        <Link href={`/transcript/${room.conversationId}`} aria-label="Transcript">
          <Book1 variant="Bold" size={40} />
        </Link>
      )}
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
      } as const;
    case "GAMING":
      return {
        text: `IN PROGRESS (TURN ${turn + 1})`,
        color: "text-primary",
      } as const;
    case "WIN":
      return {
        text: "VICTORY",
        color: "text-info",
      } as const;
    case "LOSE":
      return {
        text: "DEFEAT",
        color: "text-white/50",
      } as const;
    default:
      return {
        text: "IN PROGRESS",
        color: "text-primary",
      } as const;
  }
};
