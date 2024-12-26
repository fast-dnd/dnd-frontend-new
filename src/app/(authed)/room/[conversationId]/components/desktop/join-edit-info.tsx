"use client";

import { redirect } from "next/navigation";

import { Box } from "@/components/ui/box";
import { Button, SoundEffect } from "@/components/ui/button";
import useCopy from "@/hooks/helpers/use-copy";
import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import useGetRoomData from "@/hooks/queries/use-get-room-data";

import JoinEditSkeleton from "./join-edit-skeleton";
import Player from "./player";
import UpdateRoom from "./update-room";

const JoinEditInfo = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData, isLoading: isLoadingRoomData, isError } = useGetRoomData(conversationId);
  const { data: dungeonData, isLoading: isLoadingDungeonData } = useGetDungeon(roomData?.dungeonId);

  const { copied, onCopy } = useCopy();

  if (isError) redirect("/home");

  if (isLoadingRoomData || isLoadingDungeonData) return <JoinEditSkeleton />;

  if (!roomData || !dungeonData) return <div>Something went wrong</div>;

  return (
    <Box
      title=""
      className="mb-4 flex size-full min-h-0 flex-1 flex-col justify-between gap-5 overflow-y-auto rounded-t-md p-8 text-sm lg:mb-0 lg:gap-8"
      wrapperClassName="h-full w-[27%]"
      titleClassName="hidden"
    >
      <div className="flex min-h-[150px] w-full flex-1 flex-col gap-6">
        <p className="text-lg font-semibold uppercase">PLAYERS</p>
        <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden">
          {roomData.playerState.map((player) => (
            <Player key={player.accountId} player={player} />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 text-center lg:flex-row">
        <p className="mt-2 flex-1 whitespace-nowrap text-xl">{roomData.link}</p>
        <Button
          onClick={() => onCopy(roomData.link)}
          variant={copied ? "primary" : "outline"}
          sound={SoundEffect.CLICK_ARROW}
          className="w-full flex-1 whitespace-nowrap px-8 text-lg uppercase lg:w-fit"
        >
          {copied ? "Copied" : "Copy ID"}
        </Button>
      </div>
      <UpdateRoom conversationId={conversationId} roomData={roomData} dungeonData={dungeonData} />
    </Box>
  );
};

export default JoinEditInfo;
