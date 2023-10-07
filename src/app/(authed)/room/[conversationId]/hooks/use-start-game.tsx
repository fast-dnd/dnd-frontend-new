import { useMutation, useQueryClient } from "@tanstack/react-query";

import roomService, { roomKey } from "@/services/room-service";

const useStartGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomService.startGame,
    onSuccess: () => {
      queryClient.invalidateQueries([roomKey]);
    },
  });
};

export default useStartGame;
