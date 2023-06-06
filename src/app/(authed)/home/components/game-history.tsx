"use client";

import { IRoomData } from "@/services/dndService";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";

const GameHistory = (props: { roomHistory: Partial<IRoomData>[] }) => {
  const { roomHistory } = props;

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-8 overflow-y-auto no-scrollbar">
      {roomHistory.map((room, i) => (
        <div
          key={i /* room.conversationId */}
          className="flex flex-row items-center gap-4"
        >
          <Image src={room.image || ""} alt={"Game"} width={80} height={80} />
          <div className="flex flex-col gap-1 flex-1 justify-center">
            <p className="leading-5 font-medium tracking-widest uppercase">
              Dungeon name
            </p>
            <p className="text-sm tracking-[0.15em] uppercase">Avatar name</p>
            {room.state === "GAMING" && (
              <p className="text-sm tracking-[0.15em] text-tomato uppercase">
                RESUME (TURN {room.currentRound})
              </p>
            )}
          </div>
          {room.state === "GAMING" && (
            <AiOutlineRight
              className="cursor-pointer text-tomato h-8 w-5"
              preserveAspectRatio="none"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GameHistory;
