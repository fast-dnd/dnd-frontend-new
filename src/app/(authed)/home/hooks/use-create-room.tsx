import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import roomService, { roomKey } from "@/services/room-service";
import { IChampion } from "@/types/dungeon";

const useCreateRoom = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [_, setAccountId] = useLocalStorage("accountId", "");
  const [customChampion, setCustomChampion] = useLocalStorage<IChampion | null>(
    "customChampion",
    null,
  );
  return useMutation({
    mutationFn: roomService.createRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries([roomKey]);
      if (data.admin) setAccountId(data.admin.accountId);
      setCustomChampion(null);
      router.push(`room/${data.conversationId}`);
    },
  });
};

export default useCreateRoom;
