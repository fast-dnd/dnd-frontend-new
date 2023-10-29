"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Game, Star1 } from "iconsax-react";

import { IBaseDungeon } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

const MobileAdventure = ({
  adventure,
  adventureDetailId,
  setAdventureDetailId,
  featured = false,
}: {
  adventure: IBaseDungeon;
  adventureDetailId?: string | undefined;
  setAdventureDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  featured?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative flex h-[104px] w-full shrink-0 rounded border border-transparent bg-black pl-[118px] transition-all hover:border-primary",
        featured && "h-52 w-48 justify-between p-3",
        adventureDetailId === adventure._id && open && "static",
        !!adventureDetailId && !open && "invisible",
      )}
      onClick={() => {
        if (!adventureDetailId) {
          setAdventureDetailId?.(adventure._id);
          setOpen(true);
        } else {
          setAdventureDetailId?.(undefined);
          setTimeout(() => {
            setOpen(false);
          }, 500);
        }
      }}
    >
      <motion.div
        className={cn(
          "absolute inset-0 aspect-square w-[102px]",
          (featured || (adventureDetailId === adventure._id && open)) && "w-full",
          open && "z-20",
        )}
        layout
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      >
        <Image
          alt=""
          draggable={false}
          src={adventure.imageUrl ?? "/images/default-dungeon.png"}
          width={1024}
          height={1024}
          className="aspect-square w-full"
        />

        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 aspect-square w-full bg-gradient-to-b from-black to-transparent to-50% opacity-0 transition-all",
            (featured || open) && "opacity-100",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 aspect-square w-full bg-gradient-to-t from-black to-transparent to-80% opacity-0 transition-all",
            (featured || open) && "opacity-100",
          )}
        />
      </motion.div>

      <div className={cn("z-10 flex w-full flex-col justify-between")}>
        <div className={cn("flex justify-between", !featured && "justify-start gap-10 py-2")}>
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-black/30">
              <Game className="h-4 w-4" variant="Bold" color="#FF5A5A" />
            </div>
            <p className="text-sm font-bold">{adventure.maxPlayers}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-black/30">
              <Star1 className="h-4 w-4" variant="Bold" color="#FF5A5A" />
            </div>
            <p className="text-sm font-bold">
              {adventure.rating + " (" + adventure.numOfRatings + ")"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">{adventure.name}</p>
          <div className="flex bg-gradient-to-l from-black to-transparent to-30%">
            <div className="-z-10 flex gap-2 overflow-x-hidden">
              {adventure.tags.map((tag) => (
                <div key={tag} className="whitespace-nowrap text-xs capitalize opacity-70">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileAdventure;
