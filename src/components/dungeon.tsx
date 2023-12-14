import React from "react";
import Image from "next/image";
import { Copy, Game, Star1 } from "iconsax-react";
import { FaCheck } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";

import useCopy from "@/hooks/helpers/use-copy";
import { IBaseDungeon } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import AddToFavorites from "./add-to-favorites";
import DeleteModal from "./delete-modal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface IDungeonProps {
  dungeon: IBaseDungeon;
  setDungeonDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  addToCampaign?: (dungeon: IBaseDungeon) => void;
  isAddedToCampaign?: boolean;
  isOwned?: boolean;
  showActions?: boolean;
  addFavorite?: boolean;
}

export const Dungeon = React.forwardRef<HTMLDivElement, IDungeonProps>(
  (
    {
      dungeon,
      setDungeonDetailId,
      addToCampaign,
      isAddedToCampaign,
      isOwned,
      showActions,
      addFavorite,
    },
    ref,
  ) => {
    const onClick = () => {
      if (addToCampaign) {
        addToCampaign(dungeon);
      }
      if (setDungeonDetailId) {
        setDungeonDetailId(dungeon._id);
      }
    };

    const { copied, onCopy } = useCopy();

    return (
      <div
        className={cn(
          "flex w-full cursor-pointer gap-8 rounded-md p-4 hover:bg-white/5",
          isAddedToCampaign && "border-2 border-primary",
        )}
        onClick={onClick}
        ref={ref}
      >
        <div className="relative h-[200px] w-[200px] shrink-0 rounded-md">
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
        <div className="flex w-full min-w-0 flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-8 truncate text-2xl font-bold uppercase">
              <p className={cn(dungeon.type === "nft" && "text-gold")}>{dungeon.name}</p>
              {isOwned && (
                <div className="rounded-md border border-white/25">
                  <p className="px-3 py-1 text-sm capitalize">
                    {dungeon.publiclySeen ? "Public" : "Private"}
                  </p>
                </div>
              )}
              {isAddedToCampaign && (
                <span className="rounded-md border border-primary px-3 py-1.5 text-sm font-normal normal-case tracking-wider text-primary">
                  Selected
                </span>
              )}
            </div>
            {addFavorite && <AddToFavorites type="adventure" id={dungeon._id} />}
            {showActions && (
              <div className="mr-8 flex shrink-0 gap-4" onClick={(e) => e.stopPropagation()}>
                <div
                  className="flex items-center gap-2 text-white/50 transition-all duration-200 hover:text-info"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(dungeon._id);
                  }}
                >
                  <p>{copied ? "Copied" : "Copy ID"}</p>
                  {copied ? <GiCheckMark /> : <Copy variant="Bold" />}
                </div>
                <DeleteModal id={dungeon._id} type="adventure" />
              </div>
            )}
          </div>
          {!isOwned && dungeon.createdBy && (
            <div className="flex gap-2">
              <Image
                src={dungeon.createdBy.imageUrl || "/images/default-avatar.png"}
                alt={dungeon.createdBy.username}
                width={20}
                height={20}
                className="rounded-md lg:h-[20px] lg:w-[20px]"
              />
              <span className="truncate">{dungeon.createdBy.username}</span>
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        <Game variant="Bold" color="#FF5A5A" />
                      </div>
                      <p className="text-xl font-bold">{dungeon.maxPlayers}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="border-transparent">
                    Max players in room
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        <Star1 variant="Bold" color="#FF5A5A" />
                      </div>
                      <p className="text-xl font-bold">
                        {dungeon.rating + " (" + dungeon.numOfRatings + ")"}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="border-transparent">
                    Rating (Number of reviews)
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Dungeon.displayName = "Dungeon";
