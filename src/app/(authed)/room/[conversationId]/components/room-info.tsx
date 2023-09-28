"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { backgroundStore } from "@/stores/background-store";

import { IChampion } from "@/types/dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import GoBackButton from "@/components/go-back-button";
import DungeonDetail from "@/app/(authed)/profile/components/my-collection/dungeon-detail";

import useUpdateRole from "../hooks/use-update-role";
import LoadingStateBox from "./loading-state-box";

const RoomInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const router = useRouter();

  const bgUrl = backgroundStore.bgUrl;

  const { data: roomData, isLoading: isLoadingRoomData } = useGetRoomData(conversationId);

  const { mutate: updateRole } = useUpdateRole();

  const [bgSet, setBgSet] = useState(false);

  const [selectedChampion, setSelectedChampion] = useState<IChampion>();

  // useEffect(() => {
  //   if (!dungeonData) bgUrl.set("");
  //   if (dungeonData && !bgSet) {
  //     setBgSet(true);
  //     bgUrl.set(dungeonData.backgroundUrl);
  //   }
  // }, [bgSet, bgUrl, dungeonData]);

  if (isLoadingRoomData) return <LoadingStateBox />;

  if (!roomData) return <div>Something went wrong</div>;

  const onChangeChampion = (champion: IChampion) => {
    setSelectedChampion(champion);
    updateRole({ conversationId, championId: champion._id });
  };

  return (
    <Box
      title="LOBBY"
      className="flex min-h-0 flex-col gap-5 p-5 lg:gap-8 lg:p-8"
      wrapperClassName="block mx-auto basis-3/4"
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
