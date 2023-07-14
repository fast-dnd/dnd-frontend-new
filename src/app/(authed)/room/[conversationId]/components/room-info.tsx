"use client";

import Image from "next/image";

import useCopy from "@/hooks/use-copy";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import LoadingStateBox from "./loading-state-box";
import Player from "./player";

const RoomInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { data: roomData, isLoading: isLoadingRoomData } = useGetRoomData(conversationId);
  const { data: dungeonData, isLoading: isLoadingDungeonData } = useGetDungeon(roomData?.dungeonId);

  const [copied, setCopied] = useCopy();

  if (isLoadingRoomData || isLoadingDungeonData) return <LoadingStateBox />;

  if (!roomData || !dungeonData) return <div>Something went wrong</div>;

  const onCopyRoomId = () => {
    navigator.clipboard.writeText(roomData.link);
    setCopied(true);
  };

  return (
    <Box
      title="ROOM"
      className="flex min-h-0 flex-col gap-5 p-5 lg:max-h-[85%] lg:w-[490px] lg:gap-8 lg:p-8"
      wrapperClassName="block w-[90%] md:w-[490px] mx-auto"
    >
      <div className="flex flex-col justify-between gap-4 text-center lg:flex-row">
        <p className="mt-2 flex-1 whitespace-nowrap text-xl">{roomData.link}</p>
        <Button
          onClick={onCopyRoomId}
          variant={copied ? "primary" : "outline"}
          className="w-full whitespace-nowrap px-8 text-lg uppercase lg:w-fit"
        >
          {copied ? "Copied" : "Copy ID"}
        </Button>
      </div>

      <div className="w-full border-t border-white/20" />

      <div className="flex min-h-0 w-full flex-1 flex-col gap-5 lg:gap-8 lg:overflow-y-auto">
        <p className="text-lg font-semibold uppercase leading-7 tracking-[3.3px] lg:text-2xl">
          {dungeonData.name}
        </p>
        <div className="flex flex-row gap-6 pr-0">
          <Image
            src={dungeonData.imageUrl || "/images/default-dungeon.png"}
            alt={dungeonData.name}
            width={100}
            height={100}
            className="h-[70px] w-[70px] lg:h-[100px] lg:w-[100px]"
          />
          <p className="line-clamp-3 text-sm font-light leading-7 tracking-widest lg:text-lg">
            {dungeonData.description}
          </p>
        </div>
        <p className="text-lg font-semibold uppercase leading-7 tracking-[3.3px] lg:text-2xl">
          PLAYERS
        </p>
        <div className="flex flex-col gap-4">
          {roomData.playerState.map((player) => (
            <Player key={player.accountId} player={player} />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default RoomInfo;
