"use client";

import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { VscHeartFilled } from "react-icons/vsc";

import { IDungeonDetail } from "@/types/dungeon";
import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import useTimer from "../../hooks/use-timer";

const AdventureHeader = ({
  roomData,
  adventure,
  currentPlayer,
  progress,
}: {
  roomData: IRoomDetail;
  adventure: IDungeonDetail;
  currentPlayer: IPlayer;
  progress: number;
}) => {
  const { timeToDisplay } = useTimer(roomData);
  return (
    <div className="fixed z-10 flex h-32 w-full flex-col justify-end">
      <Image
        src={adventure?.imageUrl || "/images/default-dungeon.png"}
        alt=""
        width={1024}
        height={1024}
        className="absolute -z-10 h-32 object-cover"
      />
      <div className="flex h-14 w-full items-end bg-gradient-to-t from-black to-transparent p-4 text-sm">
        <div className="flex w-full flex-wrap items-center justify-between">
          <p className="truncate font-medium leading-4">{adventure.name}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <VscHeartFilled />
              {currentPlayer.health}
            </div>
            <div className="flex items-center gap-1.5">
              <BsFillLightningFill />
              {currentPlayer.bonusForNextRound}
            </div>
            <div className="flex items-center gap-1.5">
              <HiSparkles />
              {currentPlayer.mana}
            </div>
            <p className="w-8 font-bold text-primary">{timeToDisplay()}</p>
          </div>
        </div>
      </div>
      <hr
        className={cn("absolute bottom-0 left-0 border-primary transition-all duration-500")}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
export default AdventureHeader;
