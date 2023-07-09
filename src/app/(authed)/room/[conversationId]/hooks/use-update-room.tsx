import roomService from "@/services/room-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateRoom = (conversationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: roomService.editRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(["room", conversationId]);
    },
  });
};

export default useUpdateRoom;
