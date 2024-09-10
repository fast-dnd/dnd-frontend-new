"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Game, Star1 } from "iconsax-react";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import { IChampion } from "@/types/dungeon";
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
                    <div className="flex size-6 items-center justify-center rounded bg-black">
                      <Game className="size-4" variant="Bold" color="#FF5A5A" />
                    </div>
                    <p className="rounded-md bg-dark-900/20 px-2 py-0.5 text-sm font-bold">
                      {adventure.maxPlayers}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex size-6 items-center justify-center rounded bg-black">
                      <Star1 className="size-4" variant="Bold" color="#FF5A5A" />
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
              CLICK TO START
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Champion = ({ champion }: { champion: IChampion }) => {
  return (
    <div className="rounded-md bg-black py-4">
      <motion.header className="flex gap-4 bg-black px-4">
        <Image
          src={champion.imageUrl || "/images/default-avatar.png"}
          alt={champion.name}
          width={84}
          height={84}
          className="size-24 rounded-full"
        />{" "}
        <div className="flex w-full min-w-0 flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="w-full truncate break-words font-bold">{champion.name}</p>
            <p className="w-full break-words text-sm font-light">{champion.description}</p>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default MobileAdventureDetail;
