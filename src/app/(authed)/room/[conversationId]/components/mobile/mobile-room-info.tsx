"use client";

import Image from "next/image";
import { Copy } from "iconsax-react";
import { GiCheckMark } from "react-icons/gi";

import useCopy from "@/hooks/helpers/use-copy";
import { IChampion } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

const MobileRoomInfo = ({
  roomData,
  selectedChampion,
}: {
  roomData: IRoomDetail | undefined;
  selectedChampion: IChampion | null | undefined;
}) => {
  const { copied, onCopy } = useCopy();

  return (
    <div className="relative flex items-center justify-between bg-black p-4">
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-light">Game ID:</p>
        <p
          className="inline-flex items-center gap-1 font-bold"
          onClick={() => onCopy(roomData?.link || "")}
        >
          {roomData?.link}
          {copied ? <GiCheckMark /> : <Copy variant="Outline" />}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {roomData?.playerState.map((player) => (
          <div key={player.accountId} className="relative w-fit rounded-full border border-white">
            {player.champion && (
              <>
                {" "}
                <div className="absolute h-full w-full rounded-full  bg-gradient-to-b from-black/0 to-black backdrop-blur-[1px]" />
                <GiCheckMark className="absolute left-1/4 top-1/4" />{" "}
              </>
            )}
            <Image
              src={player.imageUrl || "/images/default-avatar.png"}
              width={30}
              height={30}
              alt={`player-${player.accountId}-avatar`}
              className="rounded-full"
            />
          </div>
        ))}
      </div>

      <hr
        className={cn(
          "absolute bottom-0 left-0 bg-primary transition-all duration-500",
          selectedChampion ? "w-[70%]" : "w-[30%]",
        )}
      />
    </div>
  );
};

export default MobileRoomInfo;
