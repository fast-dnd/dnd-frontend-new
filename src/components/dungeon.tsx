import React from "react";
import Image from "next/image";
import { Game, Star1 } from "iconsax-react";
import { FaCheck } from "react-icons/fa";

import { IBaseDungeon } from "@/types/dungeon";

export const Dungeon = React.forwardRef<
  HTMLDivElement,
  {
    dungeon: IBaseDungeon;
    setDungeonDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
    addToCampaign?: (dungeon: IBaseDungeon) => void;
    isAddedToCampaign?: boolean;
    isOwned?: boolean;
  }
>(({ dungeon, setDungeonDetailId, addToCampaign, isAddedToCampaign, isOwned }, ref) => {
  const onClick = () => {
    if (addToCampaign) {
      addToCampaign(dungeon);
    }
    if (setDungeonDetailId) {
      setDungeonDetailId(dungeon._id);
    }
  };

  return (
    <div
      className="flex cursor-pointer gap-8 rounded-md hover:bg-white/5"
      onClick={onClick}
      ref={ref}
    >
      <div className="relative h-[200px] w-[250px] rounded-md">
        {isAddedToCampaign && (
          <>
            <div className="absolute left-0 top-0 h-full w-full rounded-md bg-black/50" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <FaCheck className="h-12 w-12 fill-primary" />
            </div>
          </>
        )}
        <Image
          src={dungeon.imageUrl || "/images/default-dungeon.png"}
          alt={dungeon.name}
          width={200}
          height={200}
          className="h-16 w-16 rounded-md lg:h-[200px] lg:w-[200px]"
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <p className="inline-flex items-center gap-8 text-2xl font-bold uppercase">
          {dungeon.name}
          {isAddedToCampaign && (
            <span className="rounded-md border border-primary px-3 py-1.5 text-sm font-normal normal-case tracking-wider text-primary">
              Selected
            </span>
          )}
        </p>
        {!isOwned && dungeon.createdBy && (
          <div className="flex gap-2">
            <Image
              src={dungeon.createdBy.imageUrl || "/images/default-avatar.png"}
              alt={dungeon.createdBy.username}
              width={20}
              height={20}
              className="rounded-md lg:h-[20px] lg:w-[20px]"
            />
            {dungeon.createdBy.username}
          </div>
        )}
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
