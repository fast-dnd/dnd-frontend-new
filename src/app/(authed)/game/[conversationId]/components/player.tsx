import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { RiCopperCoinFill } from "react-icons/ri";
import { VscHeartFilled } from "react-icons/vsc";

import { IPlayer } from "@/types/room";
import { cn } from "@/utils/style-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SkullIcon from "@/components/icons/skull-icon";

import { PlayerChanges } from "../stores/game-store";

const Player = (props: { player: IPlayer; currentPlayer?: boolean; changes?: PlayerChanges }) => {
  const { player, currentPlayer, changes } = props;

  return (
    <div className="relative flex gap-4 lg:gap-6">
      <div className="relative h-16 w-16 shrink-0 lg:h-[90px] lg:w-[90px]">
        <Image
          src={player.imageUrl || "/images/default-avatar.png"}
          alt={player.name}
          draggable={false}
          width={90}
          height={90}
          className="h-full w-full"
        />
        {player.health <= 0 && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/75">
            <SkullIcon
              className={cn(
                "h-3/4 w-3/4",
                !!currentPlayer && !!changes && changes.lostHealth && "fill-primary",
              )}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col justify-between lg:gap-1.5",
          player.health <= 0 && "pointer-events-none opacity-50",
        )}
      >
        <p className="-mt-1 font-semibold uppercase tracking-[0.07em] lg:text-xl">{player.name}</p>
        <p className="-mt-0.5 text-sm font-light tracking-[0.15em] lg:text-base">
          {player.champion?.name}
        </p>
        <div className="flex lg:gap-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  disabled={player.health <= 0}
                  className={cn(
                    "mr-4 flex cursor-default items-center gap-1 text-sm transition-colors duration-500 lg:gap-2 lg:text-lg",
                    !!currentPlayer && !!changes && !!changes.gainedHealth && "text-green-500",
                    !!currentPlayer && !!changes && !!changes.lostHealth && "text-red-500",
                  )}
                >
                  <VscHeartFilled />
                  <span className="mt-0.5">{Math.max(0, player.health)}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Health</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  disabled={player.health <= 0}
                  className={cn(
                    "mr-4 flex cursor-default items-center gap-1 text-sm transition-colors duration-500 lg:gap-2 lg:text-lg",
                    !!currentPlayer && !!changes && !!changes.gainedBonus && "text-fuchsia-500",
                  )}
                >
                  <BsFillLightningFill />
                  <span className="mt-0.5">{player.bonusForNextRound}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bonus - will be applied on next roll</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  disabled={player.health <= 0}
                  className={cn(
                    "mr-4 flex cursor-default items-center gap-1 text-sm transition-colors duration-500 lg:gap-2 lg:text-lg",
                    !!currentPlayer && !!changes && !!changes.gainedMana && "text-cyan-500",
                  )}
                >
                  <HiSparkles />
                  <span className="mt-0.5">{player.mana}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mana - can be used on any roll</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  disabled={player.health <= 0}
                  className={cn(
                    "mr-4 flex cursor-default items-center gap-1 text-sm transition-colors duration-500 lg:gap-2 lg:text-lg",
                    !!currentPlayer && !!changes && !!changes.gainedGold && "text-yellow-400",
                  )}
                >
                  <RiCopperCoinFill />
                  <span className="mt-0.5">{player.gold}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gold that you have aquired till now</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
