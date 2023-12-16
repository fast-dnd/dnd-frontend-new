"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Game, Star1 } from "iconsax-react";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import HelmetIcon from "@/components/icons/helmet-icon";
import { Button } from "@/components/ui/button";
import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import { IChampion, IMoveMapping } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import useCreateRoom from "../../hooks/use-create-room";

interface IMobileAdventureDetailProps {
  adventureDetailId?: string | undefined;
  onClose?: () => void;
  hideStartButton?: boolean;
}

const MobileAdventureDetail = ({
  adventureDetailId,
  onClose,
  hideStartButton = false,
}: IMobileAdventureDetailProps) => {
  const { data: adventure, isLoading } = useGetDungeon(adventureDetailId ?? "");

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  const onCreateRoom = () => {
    createRoom({
      generateAudio: false,
      generateImages: false,
      dungeon: adventureDetailId,
    });
  };
  return (
    <AnimatePresence mode="wait">
      {!!adventureDetailId && !isLoading && !!adventure && (
        <>
          <motion.div
            className={cn("pointer-events-none absolute inset-0 z-30 h-fit w-full pt-[50vw]")}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            exit={{ y: 100, opacity: 0 }}
          >
            {onClose && (
              <div
                className="pointer-events-auto absolute right-1 top-1 z-20 rounded bg-black/20"
                onClick={onClose}
              >
                <AiOutlineClose />
              </div>
            )}
            <div className="pointer-events-auto flex flex-col">
              <div className="flex flex-col gap-2 px-4">
                <div className="flex gap-6">
                  <div className="flex items-center gap-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-black">
                      <Game className="h-4 w-4" variant="Bold" color="#FF5A5A" />
                    </div>
                    <p className="rounded-md bg-dark-900/20 px-2 py-0.5 text-sm font-bold">
                      {adventure.maxPlayers}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-black">
                      <Star1 className="h-4 w-4" variant="Bold" color="#FF5A5A" />
                    </div>
                    <p className="rounded-md bg-dark-900/20 px-2 py-0.5 text-sm font-bold">
                      {adventure.rating + " (" + adventure.numOfRatings + ")"}
                    </p>
                  </div>
                </div>

                <p className="line-clamp-2 w-full break-words text-[32px] font-semibold uppercase">
                  {adventure.name}
                </p>

                <div className="flex gap-2 overflow-x-hidden py-2 pl-0.5">
                  {adventure.tags.map((tag) => (
                    <div key={tag} className="whitespace-nowrap text-xs capitalize opacity-70">
                      {tag}
                    </div>
                  ))}
                </div>

                <p className="mt-2 w-full break-words text-sm font-light">
                  {adventure.description}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <p className="text-sm font-medium">Created by:</p>
                  <div className="flex gap-2">
                    <Image
                      src={adventure.createdBy?.imageUrl || "/images/default-avatar.png"}
                      alt={adventure.createdBy?.username || ""}
                      width={20}
                      height={20}
                      className="shrink-0 rounded-full"
                    />
                    <span className="truncate text-sm font-light">
                      {adventure.createdBy?.username}
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-6 h-0.5 w-full bg-black shadow-lobby" />
              <div className="mb-32 flex flex-col gap-4 px-4 pb-4">
                <p className="text-sm font-medium uppercase">Characters</p>
                {adventure.champions.map((champion) => (
                  <Champion key={champion._id} champion={champion} />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={cn(
              "pointer-events-none fixed bottom-0 z-30 flex w-full justify-center bg-gradient-to-t from-dark-900 via-dark-900/60 via-60% to-transparent pb-6 pt-12",
              hideStartButton && "hidden",
            )}
          >
            <Button
              isLoading={isCreatingRoom}
              onClick={onCreateRoom}
              className="pointer-events-auto flex w-fit gap-2"
            >
              Start the game
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Champion = ({ champion }: { champion: IChampion }) => {
  const [actions, setActions] = useState(false);

  return (
    <div className="rounded-md bg-black py-4">
      <motion.header className="flex gap-4 bg-black px-4">
        <HelmetIcon className="h-10 w-10 shrink-0" />
        <div className="flex w-full min-w-0 flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="w-full truncate break-words font-bold">{champion.name}</p>
            <p className="w-full break-words text-sm font-light">{champion.description}</p>
          </div>
          <div
            onClick={() => setActions(!actions)}
            className="flex select-none items-center gap-1 font-bold"
          >
            Character&apos;s Actions
            <FiChevronDown
              className={cn("transition-transform duration-300", actions && "rotate-180")}
            />
          </div>
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {actions && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="bg-black pl-20 pr-2"
          >
            <div className={cn("pointer-events-none flex flex-col")}>
              {moveMappingWithIcons(champion.moveMapping).map((move, index) => (
                <div key={index} className={cn("pointer-events-none mt-4 flex items-center gap-3")}>
                  {move.icon}
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-bold">{move.header}:</p>
                    <p className="line-clamp-3 text-sm font-light">{move.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const moveMappingWithIcons = (moveMapping: IMoveMapping) => {
  return [
    {
      header: "Heal action",
      text: moveMapping.discover_health,
      icon: (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/10">
          <AiFillHeart className="h-4 w-4 fill-primary" />
        </div>
      ),
    },
    {
      header: "Round bonus action",
      text: moveMapping.conversation_with_team,
      icon: (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-green-500 bg-primary/10">
          <GoPeople className="h-4 w-4 fill-green-500" />
        </div>
      ),
    },
    {
      header: "Mana action",
      text: moveMapping.discover_mana,
      icon: (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-info bg-primary/10">
          <HiSparkles className="h-4 w-4 fill-info" />
        </div>
      ),
    },
    {
      header: "Rest action",
      text: moveMapping.rest,
      icon: (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-purple-400 bg-primary/10">
          <GiNightSleep className="h-4 w-4 fill-purple-400" />
        </div>
      ),
    },
  ];
};

export default MobileAdventureDetail;
