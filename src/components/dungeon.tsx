import React from "react";
import Image from "next/image";
import { Game, Star1 } from "iconsax-react";

import { IDungeon } from "@/types/dungeon";

export const Dungeon = React.forwardRef<
  HTMLDivElement,
  {
    dungeon: IDungeon;
    setDungeonDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
  }
>(({ dungeon, setDungeonDetailId }, ref) => {
  return (
    <div
      className="flex cursor-pointer gap-8 rounded-md hover:bg-white/5"
      onClick={() => setDungeonDetailId(dungeon._id)}
      ref={ref}
    >
      <Image
        src={dungeon.imageUrl || "/images/default-dungeon.png"}
        alt={dungeon.name}
        width={200}
        height={200}
        className="h-16 w-16 rounded-md lg:h-[180px] lg:w-[180px]"
      />
      <div className="flex w-full flex-col gap-4">
        <p className="text-2xl font-bold uppercase">{dungeon.name}</p>
        <p className="text-xl">{dungeon.description}</p>
        <div className="mb-1 mt-auto flex w-full justify-between">
          <div className="flex flex-wrap gap-2 lg:gap-4">
            {dungeon.tags.map((tag) => (
              <div key={tag} className="rounded-md border border-white/25">
                <p className="px-1.5 py-1 text-sm capitalize tracking-[2.1px] lg:px-3">{tag}</p>
              </div>
            ))}
          </div>
          <div className="mr-8 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Game variant="Bold" color="#FF5A5A" />
              </div>
              <p className="text-xl font-bold">{dungeon.maxPlayers}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Star1 variant="Bold" color="#FF5A5A" />
              </div>
              <p className="text-xl font-bold">
                {dungeon.rating + "(" + dungeon.numOfRatings + ")"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Dungeon.displayName = "Dungeon";
