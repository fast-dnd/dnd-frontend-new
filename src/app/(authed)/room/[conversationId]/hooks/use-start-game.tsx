import { useMutation, useQueryClient } from "@tanstack/react-query";

import { accountKey } from "@/services/account-service";
import roomService, { roomKey } from "@/services/room-service";

const useStartGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomService.startGame,
    onSuccess: () => {
      queryClient.invalidateQueries([roomKey]);
      queryClient.invalidateQueries([accountKey]);
    },
  });
};

export default useStartGame;
