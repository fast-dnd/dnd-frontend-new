import { useMutation, useQueryClient } from "@tanstack/react-query";

import roomService, { roomKey } from "@/services/room-service";

const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomService.createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries([roomKey]);
    },
  });
};

export default useCreateRoom;
