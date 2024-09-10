import { useState } from "react";
import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { VscHeartFilled } from "react-icons/vsc";

import SkullIcon from "@/components/icons/skull-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { IPlayer } from "@/types/room";
import { cn } from "@/utils/style-utils";

import { gameStore } from "../../stores/game-store";

const Player = ({ player, currentPlayer }: { player: IPlayer; currentPlayer?: boolean }) => {
  const statusUpdate = gameStore.statusUpdate.use();
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const getClassName = (type: "health" | "bonus" | "mana") => {
    const commonClassName =
      "mr-4 flex cursor-default items-center gap-1 text-sm transition-colors duration-500 lg:gap-2 lg:text-lg ";

    if (!currentPlayer || !statusUpdate) return commonClassName;

    if (type === "health") {
      if (statusUpdate.gainedHealth) return commonClassName + "text-green-500";
      if (statusUpdate.lostHealth) return commonClassName + "text-red-500";
    }

    if (type === "bonus") {
      if (statusUpdate.bonus) return commonClassName + "text-fuchsia-500";
    }

    if (type === "mana") {
      if (statusUpdate.mana) return commonClassName + "text-cyan-500";
    }

    return commonClassName;
  };

  return (
    <div className="relative flex gap-4 lg:gap-6">
      <div className="relative size-16 shrink-0 lg:size-[90px]">
        <Image
          src={player.champion?.imageUrl || player.imageUrl || "/images/default-avatar.png"}
          alt={player.name}
          draggable={false}
          width={90}
          height={90}
          className="size-24 rounded-full"
        />
        {player.health <= 0 && (
          <div className="absolute left-0 top-0 flex size-full items-center justify-center bg-black/75 max-lg:rounded-full">
            <SkullIcon
              className={cn(
                "size-1/2 lg:size-3/4",
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
        <div className="flex cursor-pointer items-center" onClick={toggleDescription}>
          <p className="-mt-0.5 truncate text-xl tracking-[0.15em]">{player.champion?.name}</p>
          <span className="ml-2">
            {isDescriptionVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </span>
        </div>
        {isDescriptionVisible && <p className="-mt-0.5 text-lg ">{player.champion?.description}</p>}
        <div className="flex lg:gap-4">
          <div>
            <Tooltip
              content="Health - if it reaches 0, you lose"
              disabled={player.health <= 0}
              triggerClassName={getClassName("health")}
            >
              <VscHeartFilled />
              <span className="mt-0.5">{Math.max(0, player.health)}</span>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Bonus - will be applied on next roll"
              disabled={player.health <= 0}
              triggerClassName={getClassName("bonus")}
            >
              <BsFillLightningFill />
              <span className="mt-0.5">{player.bonusForNextRound}</span>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Mana - can be used on any roll"
              disabled={player.health <= 0}
              triggerClassName={getClassName("mana")}
            >
              <HiSparkles />
              <span className="mt-0.5">{player.mana}</span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
