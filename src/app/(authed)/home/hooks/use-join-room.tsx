import dndService from "@/services/dndService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useJoinRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: dndService.joinRoom,
    onSuccess: (data) => router.push(`lobby/${data.data.conversationId}`),
  });
};

export default useJoinRoom;
