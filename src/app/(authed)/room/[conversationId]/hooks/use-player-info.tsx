import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { IRoomDetail } from "@/types/room";
import { DungeonDuration } from "@/utils/dungeon-options";

const usePlayerInfo = (roomData: IRoomDetail | undefined) => {
  const [avatarId, setAvatarId] = useState<string>();
  const [role, setRole] = useState<string>();

  const [duration, setDuration] = useState<DungeonDuration>();

  const accountId = useReadLocalStorage<string>("accountId");

  useEffect(() => {
    if (roomData) {
      const currentPlayer = roomData.playerState.find((player) => player.accountId === accountId);
      setAvatarId(currentPlayer?.accountId);
      setRole(currentPlayer?.champion?.name);
    }
    if (roomData?.responseDetailsDepth) setDuration(roomData.responseDetailsDepth);
  }, [accountId, roomData]);

  return { avatarId, setAvatarId, role, setRole, duration, setDuration };
};

export default usePlayerInfo;
