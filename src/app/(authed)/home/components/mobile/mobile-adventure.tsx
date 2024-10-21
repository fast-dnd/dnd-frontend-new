"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Game, Star1 } from "iconsax-react";

import AddToFavorites from "@/components/common/add-to-favorites";
import { IBaseDungeon } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

interface IMobileAdventureProps {
  adventure: IBaseDungeon;
  adventureDetailId?: string | undefined;
  setAdventureDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  featured?: boolean;
  closingId?: string | undefined;
  featuredOpened?: boolean;
  setFeaturedOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  opening?: boolean;
  setOpening?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  addFavorite?: boolean;
}

export const MobileAdventure = React.forwardRef<HTMLDivElement, IMobileAdventureProps>(
  (
    {
      adventure,
      adventureDetailId,
      setAdventureDetailId,
      featured = false,
      closingId,
      featuredOpened = false,
      setFeaturedOpened,
      opening = false,
      setOpening,
      animate = true,
      addFavorite = false,
    },
    ref,
  ) => {
    const open = featuredOpened === featured && adventureDetailId === adventure._id;
    const closing = featuredOpened === featured && closingId === adventure._id;

    return (
      <div
        className={cn(
          "relative flex min-h-[104px] w-full shrink-0 rounded border border-transparent bg-black pl-[118px]",
          featured && "h-52 w-48 justify-between p-0",
          open && "pointer-events-none static",
          open && !opening && "bg-transparent",
          !featured && !!adventureDetailId && !open && !opening && "hidden",
        )}
        ref={ref}
        onClick={() => {
          if (!adventureDetailId) {
            setAdventureDetailId?.(adventure._id);
            setFeaturedOpened?.(featured);
            setOpening?.(true);
            setTimeout(() => setOpening?.(false), 500);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }}
      >
        <motion.div
          className={cn(
            "absolute inset-0 aspect-square w-[102px]",
            featured && "w-full",
            open && "z-20 w-full",
            closing && "z-20",
          )}
          layout={animate && (!adventureDetailId || open)}
          transition={{
            type: "tween",
            ease: "easeOut",
          }}
        >
          <Image
            alt=""
            draggable={false}
            src={adventure.imageUrl || "/images/default-dungeon.png"}
            width={1024}
            height={1024}
            className="aspect-square w-full"
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 aspect-square w-full bg-gradient-to-b from-black to-transparent to-50% opacity-0 transition-all",
              featured && !open && "opacity-100",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 aspect-square w-full bg-gradient-to-t from-black to-transparent to-80% opacity-0 transition-all",
              featured && !open && "opacity-100",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 aspect-square w-full bg-gradient-to-t from-dark-900 via-dark-900/90 via-15% to-transparent to-60% opacity-0 transition-all",
              open && "opacity-100",
            )}
          />
        </motion.div>

        <div
          className={cn(
            "z-10 flex w-full flex-col justify-between opacity-100 transition-all duration-200",
            (open || closing) && !opening && "opacity-0",
          )}
        >
          <div
            className={cn(
              "flex justify-between px-3 pt-3",
              !featured && "justify-start gap-10 px-0 pt-2",
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded bg-black/30">
                <Game className="size-4" variant="Bold" color="#FF5A5A" />
              </div>
              <p className="text-sm font-bold">{adventure.maxPlayers}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded bg-black/30">
                <Star1 className="size-4" variant="Bold" color="#FF5A5A" />
              </div>
              <p className="whitespace-nowrap text-sm font-bold">
                {adventure.rating + " (" + adventure.numOfRatings + ")"}
              </p>
              {adventure.type === "tournament" && (
                <span
                  className="flex size-5 rounded-md  px-2 py-0.5 text-sm text-white"
                  title="This adventure is inside of community battles tournament"
                >
                  🔥
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p
              className={cn(
                "line-clamp-1 break-words font-semibold",
                featured && "line-clamp-2 px-3",
              )}
            >
              {adventure.name}
            </p>

            {adventure.tags.length > 0 && (
              <div
                className={cn(
                  "flex bg-gradient-to-l from-black/80 to-transparent to-20%",
                  featured && "pl-3",
                )}
              >
                <div className={cn("-z-10 flex gap-2 overflow-x-hidden", !addFavorite && "pb-2")}>
                  {adventure.tags.map((tag) => (
                    <div
                      key={tag}
                      className="whitespace-nowrap text-xs capitalize leading-none opacity-70"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {addFavorite && (
              <div className={cn("py-1 pr-1", featured && "pl-1")}>
                <AddToFavorites type="adventure" id={adventure._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

MobileAdventure.displayName = "MobileAdventure";
