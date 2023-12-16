import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import roomService, { roomKey } from "@/services/room-service";

const useJoinRoom = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [_, setAccountId] = useLocalStorage("accountId", "");

  return useMutation({
    mutationFn: roomService.joinRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries([roomKey]);
      if (data.player) setAccountId(data.player.accountId);
      router.push(`room/${data.conversationId}`);
    },
  });
};

export default useJoinRoom;
