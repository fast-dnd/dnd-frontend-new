import { useRouter } from "next/navigation";
import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";

const useJoinRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: roomService.joinRoom,
    onSuccess: (data) => {
      if (data.data.player) localStorage.setItem("accountId", data.data.player.accountId);
      router.push(`room/${data.data.conversationId}`);
    },
  });
};

export default useJoinRoom;
