import { useReadLocalStorage } from "usehooks-ts";

import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { IChampion } from "@/types/dungeon";

import useCharacterControls from "./use-character-controls";
import useUpdateRole from "./use-update-role";

const useChampionInfo = ({ conversationId }: { conversationId: string }) => {
  const { dungeon, currentIndex, nextChamp, prevChamp } = useCharacterControls({ conversationId });

  const displayedChampion = dungeon?.champions[currentIndex];

  const { mutate: updateRole } = useUpdateRole();

  const { data: roomData } = useGetRoomData(conversationId);

  const accountId = useReadLocalStorage<string>("accountId");
  const currUser = roomData?.playerState.find((player) => player.accountId === accountId);
  const selectedChampion = currUser?.champion;

  const takenChampions = roomData?.playerState
    .filter((player) => player.accountId !== accountId && !!player.champion)
    .map((player) => player.champion) as IChampion[];

  const isTaken = (champion?: IChampion) =>
    takenChampions?.some((champ) => champ._id === champion?._id) ?? false;

  const onChangeChampion = (champion?: IChampion) => {
    if (champion === selectedChampion) updateRole({ conversationId, championId: undefined });
    else if (!isTaken(champion)) {
      updateRole({ conversationId, championId: champion?._id });
    }
  };

  return {
    roomData,
    dungeon,
    selectedChampion,
    displayedChampion,
    takenChampions,
    isTaken,
    onChangeChampion,
    nextChamp,
    prevChamp,
  };
};

export default useChampionInfo;
