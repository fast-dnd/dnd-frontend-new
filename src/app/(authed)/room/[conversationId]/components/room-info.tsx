"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IChampion } from "@/types/dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import Spinner from "@/components/ui/spinner";
import GoBackButton from "@/components/go-back-button";
import DungeonDetail from "@/app/(authed)/profile/components/my-collection/dungeon-detail";

import useUpdateRole from "../hooks/use-update-role";

const RoomInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const router = useRouter();

  const { data: roomData, isLoading: isLoadingRoomData } = useGetRoomData(conversationId);

  const { mutate: updateRole } = useUpdateRole();

  const [selectedChampion, setSelectedChampion] = useState<IChampion>();

  if (isLoadingRoomData)
    return (
      <Box
        title="LOBBY"
        className="flex h-full min-h-0 shrink flex-col items-center justify-center gap-5 p-5 lg:gap-8 lg:p-8"
        wrapperClassName="h-full mx-auto basis-3/4"
      >
        <Spinner className="h-40 w-40" />
      </Box>
    );

  if (!roomData) return <div>Something went wrong</div>;

  const onChangeChampion = (champion: IChampion) => {
    setSelectedChampion(champion);
    updateRole({ conversationId, championId: champion._id });
  };

  return (
    <Box
      title="LOBBY"
      className="flex h-full min-h-0 shrink flex-col gap-5 p-5 lg:gap-8 lg:p-8"
      wrapperClassName="h-full mx-auto basis-3/4"
    >
      <GoBackButton className="mb-0" onClick={() => router.push("/home")} />
      <div className="flex min-h-0 w-full flex-1 flex-col gap-5 lg:gap-8 lg:overflow-y-auto">
        <DungeonDetail
          dungeonDetailId={roomData.dungeonId}
          selectedChampion={selectedChampion}
          onChangeChampion={onChangeChampion}
        />
      </div>
    </Box>
  );
};

export default RoomInfo;
