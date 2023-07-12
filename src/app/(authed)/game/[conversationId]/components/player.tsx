import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { RiCopperCoinFill } from "react-icons/ri";
import { VscHeartFilled } from "react-icons/vsc";

import { IPlayer } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import useGetAvatar from "@/hooks/use-get-avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { PlayerChanges } from "../stores/game-store";

const Player = (props: { player: IPlayer; currentPlayer?: boolean; changes?: PlayerChanges }) => {
  const { player, currentPlayer, changes } = props;

  const { data: avatarData } = useGetAvatar(player.avatarId);

  return (
    <div className="relative flex gap-4 lg:gap-6">
      <div className="relative h-[76px] w-[76px] shrink-0 lg:h-[90px] lg:w-[90px]">
        <Image
          src={avatarData?.imageUrl || "/images/default-avatar.png"}
          alt={player.name}
          draggable={false}
          width={90}
          height={90}
          className="h-full w-full"
        />
        {player.health <= 0 && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/75">
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame">
                <path
                  className={cn(
                    "fill-white transition-colors duration-500",
                    !!currentPlayer && !!changes && changes.lostHealth && "fill-tomato",
                  )}
                  id="Vector"
                  d="M32.7305 2C18.3942 2 6.73047 13.6637 6.73047 28V47.3537L16.9805 51.455L19.0905 62H24.7305V54H28.7305V62H30.7305V54H34.7305V62H36.7305V54H40.7305V62H46.3705L48.4805 51.455L58.7305 47.3537V28C58.7305 13.6637 47.0667 2 32.7305 2ZM21.7305 42C20.346 42 18.9926 41.5895 17.8415 40.8203C16.6903 40.0511 15.7931 38.9579 15.2633 37.6788C14.7335 36.3997 14.5949 34.9922 14.865 33.6344C15.1351 32.2765 15.8018 31.0292 16.7807 30.0503C17.7597 29.0713 19.007 28.4046 20.3648 28.1345C21.7227 27.8644 23.1302 28.003 24.4093 28.5328C25.6883 29.0627 26.7816 29.9599 27.5508 31.111C28.3199 32.2622 28.7305 33.6155 28.7305 35C28.7285 36.8559 27.9903 38.6352 26.678 39.9476C25.3657 41.2599 23.5864 41.998 21.7305 42ZM28.1692 50L31.2305 40H34.2305L37.2917 50H28.1692ZM43.7305 42C42.346 42 40.9926 41.5895 39.8415 40.8203C38.6903 40.0511 37.7931 38.9579 37.2633 37.6788C36.7335 36.3997 36.5949 34.9922 36.865 33.6344C37.1351 32.2765 37.8018 31.0292 38.7807 30.0503C39.7597 29.0713 41.007 28.4046 42.3648 28.1345C43.7227 27.8644 45.1302 28.003 46.4093 28.5328C47.6883 29.0627 48.7816 29.9599 49.5508 31.111C50.3199 32.2622 50.7305 33.6155 50.7305 35C50.7285 36.8559 49.9903 38.6352 48.678 39.9476C47.3657 41.2599 45.5864 41.998 43.7305 42Z"
                />
              </g>
            </svg>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col lg:gap-1.5",
          player.health <= 0 && "pointer-events-none opacity-50",
        )}
      >
        <p className="-mt-1 text-xl font-semibold uppercase tracking-[0.07em]">{player.name}</p>
        <p className="font-light tracking-[0.15em]">{player.champion.name}</p>
        <div className="flex flex-wrap lg:gap-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  disabled={player.health <= 0}
                  className={cn(
                    "mr-4 flex cursor-default items-center gap-1 transition-colors duration-500 lg:gap-2 lg:text-lg",
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
                    "mr-4 flex cursor-default items-center gap-1 transition-colors duration-500 lg:gap-2 lg:text-lg",
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
                    "mr-4 flex cursor-default items-center gap-1 transition-colors duration-500 lg:gap-2 lg:text-lg",
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
                    "mr-4 flex cursor-default items-center gap-1 transition-colors duration-500 lg:gap-2 lg:text-lg",
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
