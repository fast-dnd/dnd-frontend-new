"use client";

import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { VscHeartFilled } from "react-icons/vsc";

import { IDungeonDetail } from "@/types/dungeon";
import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import useTimer from "../../hooks/use-timer";
import { gameStore } from "../../stores/game-store";

interface IAdventureHeaderProps {
  roomData: IRoomDetail;
  adventure: IDungeonDetail;
  currentPlayer: IPlayer;
  progress: number;
}
const AdventureHeader = ({
  roomData,
  adventure,
  currentPlayer,
  progress,
}: IAdventureHeaderProps) => {
  const { timeToDisplay } = useTimer(roomData);
  const statusUpdate = gameStore.statusUpdate.use();

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
        <div className="flex w-full items-center justify-between gap-2">
          <p className="truncate font-medium leading-4">{adventure.name}</p>
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex items-center gap-1.5 transition-colors duration-500",
                statusUpdate.gainedHealth && "text-green-500",
                statusUpdate.lostHealth && "text-red-500",
              )}
            >
              <VscHeartFilled />
              {currentPlayer.health}
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 transition-colors duration-500",
                statusUpdate.bonus && "text-fuchsia-500",
              )}
            >
              <BsFillLightningFill />
              {currentPlayer.bonusForNextRound}
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 transition-colors duration-500",
                statusUpdate.mana && "text-cyan-500",
              )}
            >
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
