"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import HelmetIcon from "@/components/icons/helmet-icon";
import { Button } from "@/components/ui/button";
import { IChampion, IDungeonDetail, IMoveMapping } from "@/types/dungeon";
import { IPlayer } from "@/types/room";
import { cn } from "@/utils/style-utils";

const ChooseCharacter = ({
  dungeonData,
  selectedChampion,
  currentIndex,
  isTaken,
  takenBy,
  onChangeChampion,
  setCurrentIndex,
}: {
  dungeonData?: IDungeonDetail | undefined;
  selectedChampion: IChampion | null | undefined;
  currentIndex: number;
  isTaken: (champion?: IChampion) => boolean;
  takenBy: (champion?: IChampion) => IPlayer | undefined;
  onChangeChampion: (champion: IChampion | undefined) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (!dungeonData) return <div></div>;

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-4 overflow-hidden px-8 py-4 text-sm",
        selectedChampion && "hidden",
      )}
    >
      <p className="uppercase">Choose your Character</p>
      <div className="relative h-full w-full">
        {dungeonData.champions.map((champion, i) => (
          <CharacterCard
            key={champion._id}
            champion={champion}
            index={i}
            currentIndex={currentIndex}
            animate={!selectedChampion}
            isTaken={isTaken}
            takenBy={takenBy}
            onChangeChampion={onChangeChampion}
            setCurrentIndex={setCurrentIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseCharacter;

const CharacterCard = ({
  champion,
  index,
  currentIndex,
  animate,
  isTaken,
  takenBy,
  onChangeChampion,
  setCurrentIndex,
}: {
  champion: IChampion;
  index: number;
  currentIndex: number;
  animate: boolean;
  isTaken: (champion?: IChampion) => boolean;
  takenBy: (champion?: IChampion) => IPlayer | undefined;
  onChangeChampion: (champion: IChampion | undefined) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const taker = isTaken(champion) ? takenBy(champion) : undefined;

  const adjecent = index === currentIndex + 1 || index === currentIndex - 1;

  return (
    <motion.div
      className="absolute flex h-full w-full flex-col justify-between rounded-md bg-black/80"
      layout={animate}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      onClick={adjecent ? () => setCurrentIndex(index) : undefined}
      style={{
        left: `calc(${(index - currentIndex) * 100}% + ${(index - currentIndex) * 0.75}rem)`,
      }}
    >
      <div className="p-4">
        <p className="text-lg font-bold">{champion?.name}</p>
        <p className="line-clamp-5 font-light">{champion?.description}</p>
        <div className="mt-4 flex flex-col gap-2">
          {champion?.moveMapping &&
            moveMappingWithIcons(champion.moveMapping).map((move, index) => (
              <div key={index} className="flex items-center gap-3">
                {move.icon}
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{move.title}</p>
                  <p className="line-clamp-1 font-light">{move.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {taker ? (
        <div className="flex w-full items-center justify-center gap-2 px-4 py-3">
          <Image
            src={taker.imageUrl || "/images/default-avatar.png"}
            width={26}
            height={26}
            alt={`player-${taker.accountId}-avatar`}
            className="h-[26px] w-[26px] rounded-full"
          />
          TAKEN
        </div>
      ) : (
        <Button
          className={cn(
            "flex gap-1.5 rounded-t-none",
            index !== currentIndex && "pointer-events-none",
          )}
          onClick={() => onChangeChampion(champion)}
        >
          <HelmetIcon className="h-5 w-5" />
          SELECT THIS CHARACTER
        </Button>
      )}
    </motion.div>
  );
};

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
