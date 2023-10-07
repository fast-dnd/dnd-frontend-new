import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import roomService, { roomKey } from "@/services/room-service";

const useJoinRoom = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: roomService.joinRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries([roomKey]);

      if (data.player) localStorage.setItem("accountId", JSON.stringify(data.player.accountId));
      router.push(`room/${data.conversationId}`);
    },
  });
};

export default useJoinRoom;
