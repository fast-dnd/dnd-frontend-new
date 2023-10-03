"use client";

import { redirect } from "next/navigation";

import useCopy from "@/hooks/use-copy";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import LoadingStateBox from "./loading-state-box";
import Player from "./player";
import UpdateRoom from "./update-room";

const JoinEditInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { data: roomData, isLoading: isLoadingRoomData, isError } = useGetRoomData(conversationId);
  const { data: dungeonData, isLoading: isLoadingDungeonData } = useGetDungeon(roomData?.dungeonId);

  const [copied, setCopied] = useCopy();

  if (isError) redirect("/home");

  if (isLoadingRoomData || isLoadingDungeonData) return <LoadingStateBox />;

  if (!roomData || !dungeonData) return <div>Something went wrong</div>;

  const onCopyRoomId = () => {
    navigator.clipboard.writeText(roomData.link);
    setCopied(true);
  };

  return (
    <Box
      title=""
      className="mb-4 flex h-[745px] min-h-0 flex-1 flex-col justify-between gap-5 rounded-t-md p-8 text-sm lg:mb-0 lg:gap-8"
      wrapperClassName="flex mx-auto basis-1/4 h-full"
      titleClassName="hidden"
    >
      <div className="flex flex-col gap-6">
        <p className="text-lg font-semibold uppercase">PLAYERS</p>
        <div className="flex flex-col gap-4">
          {roomData.playerState.map((player) => (
            <Player key={player.accountId} player={player} />
          ))}
        </div>
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
      </div>

      <UpdateRoom conversationId={conversationId} roomData={roomData} dungeonData={dungeonData} />
    </Box>
  );
};

export default JoinEditInfo;
