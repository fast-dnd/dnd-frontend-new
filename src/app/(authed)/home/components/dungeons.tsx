"use client";

import { IDungeon } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineCheck } from "react-icons/ai";

const Dungeons = (props: {
  dungeons: IDungeon[];
  selectedDungeon: IDungeon | undefined;
  setDungeon: Dispatch<SetStateAction<IDungeon | undefined>>;
}) => {
  const { dungeons, selectedDungeon, setDungeon } = props;
  return (
    <div className="flex flex-col gap-12 flex-1 overflow-y-auto pr-8">
      {dungeons.map((dungeon) => (
        <div
          key={dungeon._id}
          className={cn(
            "flex flex-row gap-8 hover:bg-white/5",
            dungeon === selectedDungeon && "bg-white/5"
          )}
          onClick={() => setDungeon(dungeon)}
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
              {dungeon === selectedDungeon && (
                <div className="flex flex-row items-center px-3 gap-4 border border-tomato justify-self-end">
                  <AiOutlineCheck className="text-tomato text-lg" />
                  <p className="leading-6 tracking-[0.15em] text-tomato uppercase">
                    SELECTED
                  </p>
                </div>
              )}
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
