"use client";

import { redirect } from "next/navigation";

import useGetDungeon from "@/hooks/use-get-dungeon";
import { useGetKingdom } from "@/hooks/use-get-kingdom";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";

import LoadingStateBox from "./loading-state-box";
import UpdatePlayer from "./update-player";
import UpdateRoom from "./update-room";

const JoinEditInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { data: roomData, isLoading: isLoadingRoomData, isError } = useGetRoomData(conversationId);
  const { data: dungeonData, isLoading: isLoadingDungeonData } = useGetDungeon(roomData?.dungeonId);
  const { data: kingdomData, isLoading: isLoadingKingdomData } = useGetKingdom();

  if (isError) redirect("/home");

  if (isLoadingRoomData || isLoadingDungeonData || isLoadingKingdomData) return <LoadingStateBox />;

  if (!roomData || !dungeonData || !kingdomData) return <div>Something went wrong</div>;

  return (
    <Box
      title="Settings"
      className="mb-4 flex h-fit min-h-0 flex-1 flex-col gap-5 p-8 text-sm lg:mb-0 lg:gap-8"
      wrapperClassName="block w-[90%] md:w-[490px] mx-auto"
    >
      <UpdatePlayer
        conversationId={conversationId}
        roomData={roomData}
        dungeonData={dungeonData}
        kingdomData={kingdomData}
      />

      <div className="w-full border-t border-white/20" />

      <UpdateRoom conversationId={conversationId} roomData={roomData} dungeonData={dungeonData} />
    </Box>
  );
};

export default JoinEditInfo;
