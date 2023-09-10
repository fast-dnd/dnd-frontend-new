import React from "react";
import Image from "next/image";
import { Game, Star1 } from "iconsax-react";
import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { IMoveMapping } from "@/types/dungeon";
import useGetDungeon from "@/hooks/use-get-dungeon";

import { dungeonDetailIdStore } from "./stores/dungeon-detail-store";

const DungeonDetail = () => {
  const dungeonDetailId = dungeonDetailIdStore.use();
  const { data: dungeon, isLoading } = useGetDungeon(dungeonDetailId ?? "");

  if (isLoading) return <div>Loading...</div>;

  if (!dungeon) return <div>Something went wrong</div>;

  return (
    <div className="h-[600px] overflow-y-auto">
      <div className="flex cursor-pointer gap-8 rounded-md hover:bg-white/5">
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
                  {dungeon.numOfRatings === 0
                    ? "-- --"
                    : dungeon.rating + "(" + dungeon.numOfRatings + ")"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p>HEROES</p>
        <div className="mt-8 flex flex-col gap-12 px-6">
          {dungeon.champions.map((champion) => (
            <div key={champion._id} className="flex flex-col gap-4">
              <p className="text-xl font-semibold">{champion.name}</p>
              <p className="font-light">{champion.description}</p>
              <div className="flex flex-col gap-4">
                <p>ACTIONS</p>
                {/* grid 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                  {moveMappingWithIcons(champion.moveMapping).map((move) => (
                    <div key={move.text} className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        {move.icon}
                      </div>
                      <p>{move.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DungeonDetail;

// augment each key of moveMapping with text and icon fields
const moveMappingWithIcons = (moveMapping: IMoveMapping) => {
  return [
    {
      text: moveMapping.discover_health,
      icon: <AiFillHeart className="h-5 w-5 fill-primary" />,
    },
    {
      text: moveMapping.conversation_with_team,
      icon: <GoPeople className="h-5 w-5" />,
    },
    {
      text: moveMapping.discover_mana,
      icon: <HiSparkles className="h-5 w-5 fill-info" />,
    },
    {
      text: moveMapping.rest,
      icon: <GiNightSleep className="h-5 w-5" />,
    },
  ];
};
