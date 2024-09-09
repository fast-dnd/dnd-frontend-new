"use client";

import Image from "next/image";
import { Copy } from "iconsax-react";
import { GiCheckMark } from "react-icons/gi";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Spinner from "@/components/ui/spinner";
import useCopy from "@/hooks/helpers/use-copy";
import { IChampion } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

interface IMobileRoomInfoProps {
  roomData?: IRoomDetail | undefined;
  selectedChampion: IChampion | null | undefined;
  isAdmin: boolean;
  aiModelSelected: boolean;
}

const MobileRoomInfo = ({
  roomData,
  selectedChampion,
  isAdmin,
  aiModelSelected,
}: IMobileRoomInfoProps) => {
  const { copied, onCopy } = useCopy();

  return (
    <div className="relative flex items-center justify-between bg-black p-4 pt-0">
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

      <Sheet>
        <SheetTrigger>
          <div className="mt-2 flex items-center gap-2">
            {roomData?.playerState.map((player) => (
              <div
                key={player.accountId}
                className="relative w-fit rounded-full border border-white"
              >
                {player.champion && (
                  <>
                    <div className="absolute size-full rounded-full bg-gradient-to-b  from-black/0 to-black backdrop-blur-[1px]" />
                    <GiCheckMark className="absolute left-1/4 top-1/4" />{" "}
                  </>
                )}
                <Image
                  src={player.imageUrl || "/images/default-avatar.png"}
                  width={30}
                  height={30}
                  alt={`player-${player.accountId}-avatar`}
                  className="size-[30px] rounded-full"
                />
              </div>
            ))}
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="rounded-t-lg border-t border-t-white/20 bg-black backdrop-blur-md"
        >
          <p className="text-sm font-medium uppercase">PLAYERS</p>
          <div className="mt-9 flex flex-col gap-7">
            {roomData?.playerState.map((player) => (
              <div key={player.accountId} className="flex w-full gap-4">
                <div className="relative min-w-fit rounded-full">
                  {player.champion && (
                    <>
                      <div className="absolute size-full rounded-full bg-gradient-to-b  from-black/0 to-black backdrop-blur-[1px]" />
                      <GiCheckMark className="absolute left-1/3 top-1/3 h-auto w-[22px]" />
                    </>
                  )}
                  <Image
                    src={player.imageUrl || "/images/default-avatar.png"}
                    width={57}
                    height={57}
                    alt={`player-${player.accountId}-avatar`}
                    className="size-[57px] rounded-full border border-white"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold">{player.name}</p>
                  {player.champion ? (
                    <p className="line-clamp-2 text-sm">
                      {player.champion.name} -{" "}
                      <span className="font-light">{player.champion.description}</span>
                    </p>
                  ) : (
                    <div className="mb-2 flex items-center gap-2">
                      <Spinner className="m-0 fill-none text-primary" hidePath />

                      <p>Choosing character...</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <hr
        className={cn(
          "absolute bottom-0 left-0 border-primary transition-all duration-500",
          !isAdmin && "w-[30%]",
          !isAdmin && selectedChampion && "w-[70%]",
          isAdmin && "w-1/5",
          isAdmin && selectedChampion && "w-2/5",
          isAdmin && aiModelSelected && "w-4/5",
        )}
      />
    </div>
  );
};

export default MobileRoomInfo;
