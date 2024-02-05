import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useWindowSize } from "usehooks-ts";

import MobileSwiper from "@/components/common/mobile-swiper";
import { Button } from "@/components/ui/button";
import { IChampion } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

interface IGamemodeProps {
  selectedChampion: IChampion | null | undefined;
  isAdmin: boolean;
  gameModeSelected: boolean;
  setGameModeSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerateRandomWords: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const ChooseGamemode = ({
  selectedChampion,
  isAdmin,
  gameModeSelected,
  setGameModeSelected,
  setGenerateRandomWords,
}: IGamemodeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowSize();
  const itemWidth = width - 52;

  const gamemodes = [
    {
      imageUrl: "/images/regular-game-mobile.png",
      title: "regular game",
      description: "Choose round outcome by writing your response completely freely.",
      onClick: () => {
        setGenerateRandomWords(false);
        setGameModeSelected(true);
      },
    },
    {
      imageUrl: "/images/word-game-mobile.png",
      title: "word game",
      description:
        "Get challenged by creating a meaningful sentence out of several predefined words.",
      onClick: () => {
        setGenerateRandomWords(true);
        setGameModeSelected(true);
      },
    },
  ];
  return (
    <>
      {selectedChampion && isAdmin && !gameModeSelected && (
        <div
          className={cn(
            "flex flex-1 flex-col items-center gap-4 overflow-hidden px-[26px] py-4 text-sm",
            !selectedChampion && "hidden",
            (!isAdmin || gameModeSelected) && "hidden",
          )}
        >
          <p className="uppercase">Choose a game mode</p>

          <MobileSwiper
            arrayLength={gamemodes.length}
            itemWidth={itemWidth}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          >
            {gamemodes.map((gamemode, index) => {
              return (
                <motion.li layout key={index} className="relative h-full shrink-0 select-none">
                  <GamemodeCard
                    imageUrl={gamemode.imageUrl}
                    currentIndex={currentIndex}
                    index={index}
                    title={gamemode.title}
                    description={gamemode.description}
                    onClick={gamemode.onClick}
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

export default ChooseGamemode;

interface IGamemodeCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void;
  index: number;
  currentIndex: number;
}

const GamemodeCard = ({
  imageUrl,
  title,
  description,
  onClick,
  index,
  currentIndex,
}: IGamemodeCardProps) => {
  return (
    <div className="h-full w-[calc(100vw_-_3.25rem)] px-1.5">
      <div className="flex h-full w-full flex-col justify-between rounded-md bg-black/80">
        <div className="flex flex-1 flex-col items-center gap-3 p-4">
          <Image draggable={false} src={imageUrl} alt="example" width={262} height={249} />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold capitalize leading-none">{title}</p>
            <p className="text-xs font-light">{description}</p>
          </div>
        </div>

        <Button
          className={cn(
            "flex gap-1.5 rounded-t-none",
            index !== currentIndex && "pointer-events-none",
          )}
          onClick={onClick}
        >
          play {title}
        </Button>
      </div>
    </div>
  );
};
