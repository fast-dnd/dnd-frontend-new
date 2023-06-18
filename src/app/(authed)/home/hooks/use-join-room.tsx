import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
