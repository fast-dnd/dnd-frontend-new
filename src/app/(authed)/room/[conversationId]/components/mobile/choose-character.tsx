"use client";

import Image from "next/image";
import { motion } from "framer-motion";
// import { AiFillHeart } from "react-icons/ai";
// import { GiNightSleep } from "react-icons/gi";
// import { GoPeople } from "react-icons/go";
// import { HiSparkles } from "react-icons/hi";
import { useReadLocalStorage, useWindowSize } from "usehooks-ts";

import CreateHeroModal from "@/components/common/dungeon-detail/components/create-hero-modal";
import MobileSwiper from "@/components/common/mobile-swiper";
import HelmetIcon from "@/components/icons/helmet-icon";
import { Button } from "@/components/ui/button";
import { IChampion, IDungeonDetail } from "@/types/dungeon";
import { IPlayer } from "@/types/room";
import { cn } from "@/utils/style-utils";

interface IChooseCharacterProps {
  conversationId: string;
  dungeonData?: IDungeonDetail | undefined;
  selectedChampion: IChampion | null | undefined;
  currentIndex: number;
  isTaken: (champion?: IChampion) => boolean;
  takenBy: (champion?: IChampion) => IPlayer | undefined;
  onChangeChampion: (champion: IChampion | undefined) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ChooseCharacter = ({
  conversationId,
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

  const customChampion = useReadLocalStorage<IChampion | null>("customChampion");

  if (!dungeonData) return <div></div>;

  return (
    <>
      {!selectedChampion && (
        <div className="flex flex-1 flex-col items-center gap-4 overflow-hidden px-[26px] py-4 text-sm">
          <p className="uppercase">Choose your Character</p>

          <MobileSwiper
            arrayLength={dungeonData.champions.length + 1}
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
            <motion.li layout className="relative h-full shrink-0 select-none">
              <CustomCharacterCard
                conversationId={conversationId}
                champion={customChampion}
                currentIndex={currentIndex}
                index={dungeonData.champions.length}
                onChangeChampion={onChangeChampion}
              />
            </motion.li>
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
      <div className="flex h-full flex-col justify-between rounded-md bg-black/80">
        <div className="flex flex-col items-center p-4">
          <p className="text-center text-3xl font-bold">{champion?.name}</p>
          <div className="mt-2 flex items-start  py-5">
            <p className="line-clamp-5 font-light">{champion?.description}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <Image
              src={champion.imageUrl || "/images/default-avatar.png"}
              alt={champion.name}
              width={200}
              height={200}
              className="rounded-full"
            />
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
interface ICustomCharacterProps {
  conversationId: string;
  champion: IChampion | null;
  index: number;
  currentIndex: number;
  onChangeChampion: (champion: IChampion | undefined) => void;
}

const CustomCharacterCard = ({
  conversationId,
  champion,
  index,
  currentIndex,
  onChangeChampion,
}: ICustomCharacterProps) => {
  return (
    <div className="h-full w-[calc(100vw_-_3.25rem)] px-1.5">
      {!champion && (
        <div className="flex size-full flex-col justify-between rounded-md bg-black/80">
          <div className="flex flex-col p-4">
            <div className="my-4 flex w-full justify-center">
              <Image
                src={"/images/custom-character.png"}
                width={300}
                height={162}
                alt="characters"
                className="max-w-full"
              />
            </div>
            <p className="text-lg font-bold">Create Your Own Hero</p>
            <p className="line-clamp-5 font-light">
              Give your character distinctive traits and abilities to enhance the thrill and
              challenge of your gaming experience. Transform your play with a character that&apos;s
              truly your own.
            </p>
          </div>
          <CreateHeroModal conversationId={conversationId} />
        </div>
      )}

      {!!champion && (
        <div className="relative flex size-full flex-col justify-between rounded-md bg-black/80">
          <div className="absolute right-2 top-2 rounded-md bg-gold px-1.5 py-0.5 text-xs font-bold text-dark-900">
            NEW
          </div>
          <div className="p-4">
            <p className="text-lg font-bold">{champion?.name}</p>
            <p className="line-clamp-5 font-light">{champion?.description}</p>
            <div className="mt-4 flex flex-col gap-2">
              {/* {champion?.moveMapping &&
                moveMappingWithIcons(champion.moveMapping).map((move, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {move.icon}
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">{move.title}</p>
                      <p className="line-clamp-1 font-light">{move.text}</p>
                    </div>
                  </div>
                ))} */}
            </div>
          </div>
          <div className="flex">
            <CreateHeroModal conversationId={conversationId} />

            <Button
              className={cn(
                "flex gap-1.5 rounded-none rounded-br-md",
                index !== currentIndex && "pointer-events-none",
              )}
              onClick={() => onChangeChampion?.(champion)}
            >
              <HelmetIcon className="size-5 shrink-0" />
              SELECT CUSTOM
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// const moveMappingWithIcons = (moveMapping: IMoveMapping) => {
//   const commonDivClasses = "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border";
//   const commonIconClasses = "h-6 w-6 shrink-0";

//   return [
//     {
//       title: "Heal Action",
//       text: moveMapping.discover_health,
//       icon: (
//         <div className={cn(commonDivClasses, "border-primary bg-white/5 p-2")}>
//           <AiFillHeart className={cn(commonIconClasses, "fill-primary")} />
//         </div>
//       ),
//     },
//     {
//       title: "Mana Action",
//       text: moveMapping.discover_mana,
//       icon: (
//         <div className={cn(commonDivClasses, "border-info bg-white/5 p-2")}>
//           <HiSparkles className={cn(commonIconClasses, "fill-info")} />
//         </div>
//       ),
//     },
//     {
//       title: "Bonus Round Action",
//       text: moveMapping.conversation_with_team,
//       icon: (
//         <div className={cn(commonDivClasses, "border-green-500 bg-white/5 p-2")}>
//           <GoPeople className={cn(commonIconClasses, "fill-green-500")} />
//         </div>
//       ),
//     },
//     {
//       title: "Rest Action",
//       text: moveMapping.rest,
//       icon: (
//         <div className={cn(commonDivClasses, "border-purple-400 bg-white/5 p-2")}>
//           <GiNightSleep className={cn(commonIconClasses, "fill-purple-400")} />
//         </div>
//       ),
//     },
//   ];
// };
