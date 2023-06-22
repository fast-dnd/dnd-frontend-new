import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCreateRoom = () => {
  return useMutation({
    mutationFn: roomService.createRoom,
  });
};

export default useCreateRoom;
