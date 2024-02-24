import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import roomService, { roomKey } from "@/services/room-service";
import { IChampion } from "@/types/dungeon";

const useJoinRoom = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [_, setAccountId] = useLocalStorage("accountId", "");
  const [customChampion, setCustomChampion] = useLocalStorage<IChampion | null>(
    "customChampion",
    null,
  );
  return useMutation({
    mutationFn: roomService.joinRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries([roomKey]);
      if (data.player) setAccountId(data.player.accountId);
      setCustomChampion(null);
      router.push(`room/${data.conversationId}`);
    },
  });
};

export default useJoinRoom;
