"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Game, Star1 } from "iconsax-react";
import { FiChevronDown } from "react-icons/fi";

import HelmetIcon from "@/components/icons/helmet-icon";
import { Button } from "@/components/ui/button";
import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import { cn } from "@/utils/style-utils";

import useCreateRoom from "../../hooks/use-create-room";

const MobileAdventureDetail = ({
  adventureDetailId,
}: {
  adventureDetailId?: string | undefined;
}) => {
  const router = useRouter();
  const { data: adventure, isLoading } = useGetDungeon(adventureDetailId ?? "");

  const [loadingRoom, setLoadingRoom] = useState(false);

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  const onCreateRoom = () => {
    createRoom(
      {
        generateAudio: false,
        generateImages: false,
        dungeon: adventureDetailId,
      },
      {
        onSuccess: (data) => {
          if (data.admin) localStorage.setItem("accountId", JSON.stringify(data.admin.accountId));
          setLoadingRoom(true);
          router.push(`room/${data.conversationId}`);
        },
      },
    );
  };
  return (
    <AnimatePresence mode="wait">
      {!!adventureDetailId && !isLoading && !!adventure && (
        <motion.div
          className={cn("absolute inset-0 top-[50vw] z-20 h-fit w-full")}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          exit={{ y: 100, opacity: 0 }}
        >
          <div className="flex flex-col">
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

              <p className="text-[32px] font-semibold uppercase">{adventure.name}</p>

              <div className="flex gap-2 overflow-x-hidden py-2 pl-0.5">
                {adventure.tags.map((tag) => (
                  <div key={tag} className="whitespace-nowrap text-xs capitalize opacity-70">
                    {tag}
                  </div>
                ))}
              </div>

              <p className="mt-2 text-sm font-light">{adventure.description}</p>

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
            <div className="my-6 h-[1px] w-full border-b border-white/[6%] bg-black" />
            <div className="flex flex-col gap-4 px-4 pb-4">
              <p className="text-sm font-medium uppercase">Characters</p>
              {adventure.champions.map((champion) => (
                <div key={champion._id} className="flex gap-4 rounded-md bg-black p-4">
                  <HelmetIcon className="h-10 w-10 shrink-0" />
                  <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="line-clamp-1 font-bold">{champion.name}</p>
                      <p className="font-light">{champion.description}</p>
                    </div>
                    <div className="flex items-center gap-1 font-bold">
                      Character&apos;s Actions
                      <FiChevronDown />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center py-6">
              <Button
                isLoading={isCreatingRoom || loadingRoom}
                onClick={onCreateRoom}
                className="flex w-fit gap-2"
              >
                Start the game
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileAdventureDetail;
