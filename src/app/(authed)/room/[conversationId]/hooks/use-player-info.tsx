import { useEffect, useState } from "react";

import { IRoomDetail } from "@/types/room";
import { DungeonDuration } from "@/utils/dungeon-options";

const usePlayerInfo = (roomData: IRoomDetail | undefined) => {
  const [avatarId, setAvatarId] = useState<string>();
  const [role, setRole] = useState<string>();

  const [duration, setDuration] = useState<DungeonDuration>();

  useEffect(() => {
    if (roomData) {
      const currentPlayer = roomData.playerState.find(
        (player) => player.accountId === localStorage.getItem("accountId"),
      );
      setAvatarId(currentPlayer?.avatarId);
      setRole(currentPlayer?.champion?._id);
    }
    setDuration(roomData?.responseDetailsDepth);
  }, [roomData]);

  return { avatarId, setAvatarId, role, setRole, duration, setDuration };
};

export default usePlayerInfo;
