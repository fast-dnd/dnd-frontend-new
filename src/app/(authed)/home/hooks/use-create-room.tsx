import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCreateRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: roomService.createRoom,
    onSuccess: (data) => {
      if (data.data.admin) localStorage.setItem("accountId", data.data.admin.accountId);
      router.push(`room/${data.data.conversationId}`);
    },
  });
};

export default useCreateRoom;
