import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";

const useCreateRoom = () => {
  return useMutation({
    mutationFn: roomService.createRoom,
  });
};

export default useCreateRoom;
