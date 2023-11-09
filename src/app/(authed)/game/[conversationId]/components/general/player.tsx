import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { VscHeartFilled } from "react-icons/vsc";

import SkullIcon from "@/components/icons/skull-icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IPlayer } from "@/types/room";
import { cn } from "@/utils/style-utils";

import { gameStore } from "../../stores/game-store";

const Player = ({ player, currentPlayer }: { player: IPlayer; currentPlayer?: boolean }) => {
  const statusUpdate = gameStore.statusUpdate.use();

  return (
    <div className="relative flex gap-4 lg:gap-6">
      <div className="relative h-16 w-16 shrink-0 lg:h-[90px] lg:w-[90px]">
        <Image
          src={player.imageUrl || "/images/default-avatar.png"}
          alt={player.name}
          draggable={false}
          width={90}
          height={90}
          className="h-full w-full max-lg:rounded-full max-lg:border max-lg:border-white/50"
        />
        {player.health <= 0 && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/75 max-lg:rounded-full">
            <SkullIcon
              className={cn(
                "h-1/2 w-1/2 lg:h-3/4 lg:w-3/4",
                !!currentPlayer && !!statusUpdate && statusUpdate.lostHealth && "fill-primary",
              )}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex w-full min-w-0 flex-col justify-between lg:gap-1.5",
          player.health <= 0 && "pointer-events-none lg:opacity-50",
        )}
      >
        <p className="-mt-1 truncate font-bold uppercase tracking-[0.07em] lg:text-xl">
          {player.name}
        </p>
        <p className="-mt-0.5 truncate text-xs tracking-[0.15em] lg:text-base lg:font-light">
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
                    !!currentPlayer &&
                      !!statusUpdate &&
                      !!statusUpdate.gainedHealth &&
                      "text-green-500",
                    !!currentPlayer &&
                      !!statusUpdate &&
                      !!statusUpdate.lostHealth &&
                      "text-red-500",
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
                    !!currentPlayer && !!statusUpdate && !!statusUpdate.bonus && "text-fuchsia-500",
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
                    !!currentPlayer && !!statusUpdate && !!statusUpdate.mana && "text-cyan-500",
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
        </div>
      </div>
    </div>
  );
};

export default Player;
