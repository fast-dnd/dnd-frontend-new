import { useEffect, useState } from "react";

import { IRoomData } from "@/types/room";
import { DungeonDuration } from "@/utils/dungeon-options";

import useUpdateRoom from "../hooks/use-update-room";

interface IUseOnRoomChangeProps {
  conversationId: string;
  duration: DungeonDuration | undefined;
  roomData: IRoomData;
}

const useOnRoomChange = ({ conversationId, duration, roomData }: IUseOnRoomChangeProps) => {
  const [generateImages, setGenerateImages] = useState<boolean>();
  const [generateAudio, setGenerateAudio] = useState<boolean>();

  const { mutate: updateRoom } = useUpdateRoom(conversationId);

  useEffect(() => {
    if (duration || generateImages || generateAudio) {
      updateRoom({
        conversationId,
        responseDetailsDepth: duration || roomData?.responseDetailsDepth,
        generateImages,
        generateAudio,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, generateImages, generateAudio]);

  return { generateImages, setGenerateImages, generateAudio, setGenerateAudio };
};

export default useOnRoomChange;
