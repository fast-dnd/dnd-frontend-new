import { useMutation } from "@tanstack/react-query";

import roomService from "@/services/room-service";

const useCreateRoom = () => {
  return useMutation({
    mutationFn: roomService.createRoom,
  });
};

export default useCreateRoom;
