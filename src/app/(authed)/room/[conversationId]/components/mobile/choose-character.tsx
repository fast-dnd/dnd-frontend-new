"use client";

import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import HelmetIcon from "@/components/icons/helmet-icon";
import { Button } from "@/components/ui/button";
import { IChampion, IMoveMapping } from "@/types/dungeon";
import { IPlayer } from "@/types/room";
import { cn } from "@/utils/style-utils";

import ChooseCharacterControls from "./choose-character-controls";

const ChooseCharacter = ({
  selectedChampion,
  takenBy,
  onChangeChampion,
  displayedChampion,
  nextChamp,
  prevChamp,
}: {
  selectedChampion: IChampion | null | undefined;
  takenBy: IPlayer | undefined;
  onChangeChampion: (champion: IChampion | undefined) => void;
  displayedChampion: IChampion | undefined;
  nextChamp: () => void;
  prevChamp: () => void;
}) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-4 px-8 py-4 text-sm",
        selectedChampion && "hidden",
      )}
    >
      <p className="uppercase">Choose your Character</p>
      <div
        className={cn(
          "relative h-full w-full rounded-md bg-black p-4 pb-0  transition-all duration-500",
          displayedChampion ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      >
        <p className="text-lg font-bold">{displayedChampion?.name}</p>
        <p className="line-clamp-5 font-light">{displayedChampion?.description}</p>
        <div className="mt-4 flex flex-col gap-4">
          {displayedChampion?.moveMapping &&
            moveMappingWithIcons(displayedChampion.moveMapping).map((move, index) => (
              <div key={index} className="flex items-center gap-3">
                {move.icon}
                <div className="flex flex-col  gap-1">
                  <p className="font-semibold">{move.title}</p>
                  <p className="line-clamp-1 font-light">{move.text}</p>
                </div>
              </div>
            ))}
        </div>
        {takenBy ? (
          <div className="absolute bottom-6 -mx-4 flex w-full items-center justify-center gap-2">
            <Image
              src={takenBy.imageUrl || "/images/default-avatar.png"}
              width={30}
              height={30}
              alt={`player-${takenBy.accountId}-avatar`}
              className="rounded-full"
            />
            TAKEN
          </div>
        ) : (
          <Button
            className="absolute bottom-0 -mx-4 flex  gap-1.5"
            onClick={() => onChangeChampion(displayedChampion)}
          >
            <HelmetIcon className="h-5 w-5" />
            SELECT THIS CHARACTER
          </Button>
        )}
      </div>
      <ChooseCharacterControls nextChamp={nextChamp} prevChamp={prevChamp} />
    </div>
  );
};

export default ChooseCharacter;

const moveMappingWithIcons = (moveMapping: IMoveMapping) => {
  const commonDivClasses = "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border";
  const commonIconClasses = "h-6 w-6 shrink-0";

  return [
    {
      title: "Heal Action",
      text: moveMapping.discover_health,
      icon: (
        <div className={cn(commonDivClasses, "border-primary bg-white/5 p-2")}>
          <AiFillHeart className={cn(commonIconClasses, "fill-primary")} />
        </div>
      ),
    },
    {
      title: "Mana Action",
      text: moveMapping.discover_mana,
      icon: (
        <div className={cn(commonDivClasses, "border-info bg-white/5 p-2")}>
          <HiSparkles className={cn(commonIconClasses, "fill-info")} />
        </div>
      ),
    },
    {
      title: "Bonus Round Action",
      text: moveMapping.conversation_with_team,
      icon: (
        <div className={cn(commonDivClasses, "border-green-500 bg-white/5 p-2")}>
          <GoPeople className={cn(commonIconClasses, "fill-green-500")} />
        </div>
      ),
    },
    {
      title: "Rest Action",
      text: moveMapping.rest,
      icon: (
        <div className={cn(commonDivClasses, "border-purple-400 bg-white/5 p-2")}>
          <GiNightSleep className={cn(commonIconClasses, "fill-purple-400")} />
        </div>
      ),
    },
  ];
};
