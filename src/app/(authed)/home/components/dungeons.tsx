"use client";

import { cn } from "@/utils/style-utils";
import Image from "next/image";
import useHome from "../hooks/use-home";

const Dungeons = () => {
  const { myDungeons } = useHome();

  return (
    <div className="flex flex-col gap-12 flex-1 overflow-y-auto pr-8">
      {myDungeons.map((dungeon) => (
        <div
          key={dungeon._id}
          className={cn("flex flex-row gap-8 hover:bg-white/5")}
        >
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
            <p className="font-light text-lg tracking-widest">
              {dungeon.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dungeons;
