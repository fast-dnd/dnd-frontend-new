import { IDungeon } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useGetMyDungeons } from "../hooks/use-get-home-data";
import { useTabStore } from "../stores/tab-store";
import Skeleton from "@/components/ui/skeleton";

const Dungeons = () => {
  const { homeTab } = useTabStore((state) => state);

  const { data: myDungeons, isLoading } = useGetMyDungeons(homeTab === "MY KINGDOM");

  if (isLoading) return <Skeleton />;

  if (!myDungeons) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-5xl">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 flex-1 overflow-y-auto pr-8">
      {myDungeons.map((dungeon) => (
        <div key={dungeon._id} className={cn("flex flex-row gap-8 hover:bg-white/5")}>
          <Image
            src={dungeon.image || "/images/bg-cover.png"}
            alt={dungeon.name}
            width={180}
            height={180}
            className="h-[180px]"
          />
          <div className="flex flex-col py-4 gap-4 w-full">
            <div className="flex flex-row justify-between w-full pr-8">
              <p className="text-[22px] leading-7 font-medium tracking-[0.15em] uppercase">
                {dungeon.name}
              </p>
            </div>
            <p className="font-light text-lg tracking-widest">{dungeon.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dungeons;
