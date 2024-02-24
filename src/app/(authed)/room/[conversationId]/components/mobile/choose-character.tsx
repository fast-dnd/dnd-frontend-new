"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";
import { useWindowSize } from "usehooks-ts";

import MobileSwiper from "@/components/common/mobile-swiper";
import HelmetIcon from "@/components/icons/helmet-icon";
import { Button } from "@/components/ui/button";
import { IChampion, IDungeonDetail, IMoveMapping } from "@/types/dungeon";
import { IPlayer } from "@/types/room";
import { cn } from "@/utils/style-utils";

interface IChooseCharacterProps {
  dungeonData?: IDungeonDetail | undefined;
  selectedChampion: IChampion | null | undefined;
  currentIndex: number;
  isTaken: (champion?: IChampion) => boolean;
  takenBy: (champion?: IChampion) => IPlayer | undefined;
  onChangeChampion: (champion: IChampion | undefined) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ChooseCharacter = ({
  dungeonData,
  selectedChampion,
  currentIndex,
  isTaken,
  takenBy,
  onChangeChampion,
  setCurrentIndex,
}: IChooseCharacterProps) => {
  const { width } = useWindowSize();
  const itemWidth = width - 52;

  if (!dungeonData) return <div></div>;

  return (
    <>
      {!selectedChampion && (
        <div className="flex flex-1 flex-col items-center gap-4 overflow-hidden px-[26px] py-4 text-sm">
          <p className="uppercase">Choose your Character</p>

          <MobileSwiper
            arrayLength={dungeonData.champions.length}
            itemWidth={itemWidth}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          >
            {dungeonData.champions.map((champion, index) => {
              return (
                <motion.li
                  layout
                  key={champion._id}
                  className="relative h-full shrink-0 select-none"
                >
                  <CharacterCard
                    champion={champion}
                    currentIndex={currentIndex}
                    index={index}
                    isTaken={isTaken}
                    takenBy={takenBy}
                    onChangeChampion={onChangeChampion}
                  />
                </motion.li>
              );
            })}
          </MobileSwiper>
        </div>
      )}
    </>
  );
};

export default ChooseCharacter;

interface ICharacterCardProps {
  champion: IChampion;
  index: number;
  currentIndex: number;
  isTaken: (champion?: IChampion) => boolean;
  takenBy: (champion?: IChampion) => IPlayer | undefined;
  onChangeChampion: (champion: IChampion | undefined) => void;
}

const CharacterCard = ({
  champion,
  index,
  currentIndex,
  isTaken,
  takenBy,
  onChangeChampion,
}: ICharacterCardProps) => {
  const taker = isTaken(champion) ? takenBy(champion) : undefined;

  return (
    <div className="h-full w-[calc(100vw_-_3.25rem)] px-1.5">
      <div className="flex size-full flex-col justify-between rounded-md bg-black/80">
        <div className="p-4">
          <p className="text-lg font-bold">{champion?.name}</p>
          <p className="line-clamp-5 font-light">{champion?.description}</p>
          <div className="mt-4 flex flex-col gap-2">
            {champion?.moveMapping &&
              moveMappingWithIcons(champion.moveMapping).map((move, i) => (
                <div key={i} className="flex items-center gap-3">
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
              className="size-[26px] rounded-full"
            />
            TAKEN
          </div>
        ) : (
          <Button
            className={cn(
              "flex gap-1.5 rounded-t-none",
              index !== currentIndex && "pointer-events-none",
            )}
            onClick={() => onChangeChampion?.(champion)}
          >
            <HelmetIcon className="size-5" />
            SELECT THIS CHARACTER
          </Button>
        )}
      </div>
    </div>
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
