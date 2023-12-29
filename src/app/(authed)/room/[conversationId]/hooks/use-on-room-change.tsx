import { useEffect, useState } from "react";

import { IRoomDetail } from "@/types/room";
import { DungeonDuration } from "@/utils/dungeon/dungeon-options";

import useUpdateRoom from "../hooks/use-update-room";

interface IUseOnRoomChangeProps {
  conversationId: string;
  duration: DungeonDuration | undefined;
  roomData?: IRoomDetail;
  isAdmin: boolean;
}

const useOnRoomChange = ({
  conversationId,
  duration,
  roomData,
  isAdmin,
}: IUseOnRoomChangeProps) => {
  const [generateImages, setGenerateImages] = useState<boolean>();
  const [generateAudio, setGenerateAudio] = useState<boolean>();
  const [generateRandomWords, setGenerateRandomWords] = useState<boolean>();

  const { mutate: updateRoom, isLoading: updatingRoom } = useUpdateRoom(conversationId);

  useEffect(() => {
    if (
      isAdmin &&
      !updatingRoom &&
      (duration ||
        generateImages !== undefined ||
        generateAudio !== undefined ||
        generateRandomWords !== undefined)
    )
      updateRoom({
        conversationId,
        responseDetailsDepth: duration || roomData?.responseDetailsDepth,
        generateImages,
        generateAudio,
        generateRandomWords,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, generateImages, generateAudio, generateRandomWords]);

  return {
    generateImages,
    setGenerateImages,
    generateAudio,
    setGenerateAudio,
    setGenerateRandomWords,
    generateRandomWords,
    updatingRoom,
  };
};

export default useOnRoomChange;
