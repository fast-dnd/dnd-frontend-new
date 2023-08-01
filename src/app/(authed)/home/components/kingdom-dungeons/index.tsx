"use client";

import useGetMyDungeons from "@/hooks/use-get-my-dungeons";
import Skeleton from "@/components/ui/skeleton";

import { homeStore } from "../../stores/tab-store";
import KingdomDungeon from "./kingdom-dungeon";

const KingdomDungeons = () => {
  const { data: myDungeons, isLoading } = useGetMyDungeons(
    homeStore.homeTab.get() === "MY KINGDOM" && homeStore.kingdomTab.get() === "dungeons",
  );

  if (isLoading) return <Skeleton />;

  if (!myDungeons) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
      {myDungeons.map((dungeon) => (
        <KingdomDungeon key={dungeon._id} dungeon={dungeon} />
      ))}
    </div>
  );
};

export default KingdomDungeons;
