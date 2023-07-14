import { useMutation, useQueryClient } from "@tanstack/react-query";

import roomService, { roomKey } from "@/services/room-service";

const useUpdateRoom = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomService.editRoom,
    onSuccess: () => {
      queryClient.invalidateQueries([roomKey, conversationId]);
    },
  });
};

export default useUpdateRoom;
