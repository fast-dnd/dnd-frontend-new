"use client";

import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import DungeonDetail from "@/components/common/dungeon-detail";
import GoBackButton from "@/components/common/go-back-button";
import { Box } from "@/components/ui/box";
import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { IChampion } from "@/types/dungeon";

import useUpdateRole from "../../hooks/use-update-role";
import RoomInfoSkeleton from "./room-info-skeleton";

const RoomInfo = ({ conversationId }: { conversationId: string }) => {
  const accountId = useReadLocalStorage<string>("accountId");

  const { data: roomData, isLoading: isLoadingRoomData } = useGetRoomData(conversationId);

  const { mutate: updateRole } = useUpdateRole();

  const [selectedChampion, setSelectedChampion] = useState<IChampion>();

  useEffect(() => {
    const champion = roomData?.playerState.find(
      (player) => player.accountId === accountId,
    )?.champion;

    if (champion) setSelectedChampion(champion);
  }, [accountId, roomData?.playerState]);

  if (isLoadingRoomData) return <RoomInfoSkeleton />;

  if (!roomData) return <div>Something went wrong</div>;

  const takenChampions = roomData.playerState
    .filter((player) => player.accountId !== accountId && !!player.champion)
    .map((player) => player.champion) as IChampion[];

  const onChangeChampion = (champion: IChampion) => {
    if (!takenChampions.some((champ) => champ._id === champion._id)) {
      updateRole(
        { conversationId, championId: champion._id },
        {
          onSuccess: () => {
            setSelectedChampion(champion);
          },
        },
      );
    }
  };

  return (
    <Box
      title="LOBBY"
      className="flex h-full min-h-0 shrink flex-col gap-5 p-5 lg:gap-8 lg:p-8"
      wrapperClassName="h-full w-[70%]"
    >
      <GoBackButton className="mb-0" href="/home" />
      <div className="flex min-h-0 w-full flex-1 flex-col gap-5 lg:gap-8 lg:overflow-y-auto">
        <DungeonDetail
          conversationId={conversationId}
          dungeonDetailId={roomData.dungeonId}
          selectedChampion={selectedChampion}
          takenChampions={takenChampions}
          onChangeChampion={onChangeChampion}
          addFavorite
        />
      </div>
    </Box>
  );
};

export default RoomInfo;
