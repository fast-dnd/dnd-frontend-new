"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, type PanInfo } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";
import { useWindowSize } from "usehooks-ts";

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
  const { width } = useWindowSize();
  const itemWidth = width - 52;
  const containerRef = useRef<HTMLUListElement>(null);
  const offsetX = useMotionValue(-currentIndex * itemWidth);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150,
  });

  useEffect(() => {
    offsetX.set(-currentIndex * itemWidth);
  }, [currentIndex, itemWidth, offsetX]);

  if (!dungeonData) return <div></div>;

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < dungeonData.champions.length - 1;

  const handleDragSnap = (
    _: MouseEvent,
    { offset: { x: dragOffset }, velocity: { x: velocity } }: PanInfo,
  ) => {
    containerRef.current?.removeAttribute("data-dragging");
    animatedX.stop();
    const currentOffset = offsetX.get();
    const velocity_delta = Math.abs(velocity) > itemWidth ? -Math.sign(velocity) : 0;
    const steps = Math.round(-dragOffset / itemWidth);

    if (
      (steps === 0 && velocity_delta === 0) ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }
    const combined = steps !== 0 ? currentIndex + steps : currentIndex + velocity_delta;

    const newIndex =
      combined < 0
        ? 0
        : combined > dungeonData.champions.length - 1
        ? dungeonData.champions.length - 1
        : combined;

    setCurrentIndex(newIndex);
  };

  return (
    <>
      {!selectedChampion && (
        <motion.div
          className={cn(
            "flex flex-1 flex-col items-center gap-4 overflow-hidden px-[26px] py-4 text-sm",
            selectedChampion && "hidden",
          )}
        >
          <p className="uppercase">Choose your Character</p>
          <div className="h-full w-full">
            <div className="relative h-full">
              <motion.ul
                ref={containerRef}
                className="flex h-full items-start"
                style={{
                  x: animatedX,
                }}
                drag="x"
                dragConstraints={{
                  left: -(itemWidth * (dungeonData.champions.length - 1)),
                  right: itemWidth,
                }}
                onDragStart={() => {
                  containerRef.current?.setAttribute("data-dragging", "true");
                }}
                onDragEnd={handleDragSnap}
              >
                {dungeonData.champions.map((champion, index) => {
                  return (
                    <motion.li
                      layout
                      key={champion._id}
                      className="relative h-full shrink-0 select-none"
                      transition={{
                        ease: "easeInOut",
                        duration: 0.4,
                      }}
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
              </motion.ul>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChooseCharacter;

const CharacterCard = ({
  champion,
  index,
  currentIndex,
  isTaken,
  takenBy,
  onChangeChampion,
}: {
  champion: IChampion;
  index: number;
  currentIndex: number;
  isTaken: (champion?: IChampion) => boolean;
  takenBy: (champion?: IChampion) => IPlayer | undefined;
  onChangeChampion: (champion: IChampion | undefined) => void;
}) => {
  const taker = isTaken(champion) ? takenBy(champion) : undefined;

  return (
    <div className="h-full w-[calc(100vw_-_3.25rem)] px-1.5">
      <div className="flex h-full w-full flex-col justify-between rounded-md bg-black/80">
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
            onClick={() => onChangeChampion?.(champion)}
          >
            <HelmetIcon className="h-5 w-5" />
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
