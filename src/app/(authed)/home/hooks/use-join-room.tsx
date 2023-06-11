import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useJoinRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: roomService.joinRoom,
    onSuccess: (data) => router.push(`lobby/${data.data.conversationId}`),
  });
};

export default useJoinRoom;
