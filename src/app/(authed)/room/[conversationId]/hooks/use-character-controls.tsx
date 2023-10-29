import { useState } from "react";

import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import useGetRoomData from "@/hooks/queries/use-get-room-data";

const useCharacterControls = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeon } = useGetDungeon(roomData?.dungeonId);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevChamp = () => {
    if (!dungeon) return;

    setCurrentIndex(-1);

    const isFirstChamp = currentIndex === 0;
    const newIndex = isFirstChamp ? dungeon.champions.length - 1 : currentIndex - 1;

    setTimeout(() => {
      setCurrentIndex(newIndex);
    }, 500);
  };

  const nextChamp = () => {
    if (!dungeon) return;

    setCurrentIndex(-1);

    const isLastChamp = currentIndex === dungeon.champions.length - 1;
    const newIndex = isLastChamp ? 0 : currentIndex + 1;

    setTimeout(() => {
      setCurrentIndex(newIndex);
    }, 500);
  };

  return { dungeon, prevChamp, nextChamp, currentIndex };
};

export default useCharacterControls;
