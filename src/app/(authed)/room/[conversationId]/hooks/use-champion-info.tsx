import { useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { IChampion } from "@/types/dungeon";

import useUpdateRole from "./use-update-role";

const useChampionInfo = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeon } = useGetDungeon(roomData?.dungeonId);

  const { mutate: updateRole } = useUpdateRole();

  const [currentIndex, setCurrentIndex] = useState(0);

  const accountId = useReadLocalStorage<string>("accountId");
  const currUser = roomData?.playerState.find((player) => player.accountId === accountId);
  const selectedChampion = currUser?.champion;

  const takenChampions = roomData?.playerState
    .filter((player) => player.accountId !== accountId && !!player.champion)
    .map((player) => player.champion) as IChampion[];

  const isTaken = (champion?: IChampion) =>
    takenChampions?.some((champ) => champ._id === champion?._id) ?? false;

  const chmpTakenBy = (champion?: IChampion) =>
    roomData?.playerState.find((player) => player.champion?._id === champion?._id);

  const onChangeChampion = (champion?: IChampion) => {
    if (champion === selectedChampion) updateRole({ conversationId, championId: undefined });
    else if (!isTaken(champion)) {
      updateRole({ conversationId, championId: champion?._id });
    }
  };

  return {
    roomData,
    dungeon,
    currentIndex,
    selectedChampion,
    takenChampions,
    isTaken,
    chmpTakenBy,
    onChangeChampion,
    setCurrentIndex,
  };
};

export default useChampionInfo;
