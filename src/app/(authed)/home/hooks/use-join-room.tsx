import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import roomService from "@/services/room-service";

const useJoinRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: roomService.joinRoom,
    onSuccess: (data) => {
      if (data.player) localStorage.setItem("accountId", data.player.accountId);
      router.push(`room/${data.conversationId}`);
    },
  });
};

export default useJoinRoom;
