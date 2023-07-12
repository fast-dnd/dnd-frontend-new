import { useMutation } from "@tanstack/react-query";

import gameService from "@/services/game-service";

const usePlayMove = () => {
  return useMutation({
    mutationFn: gameService.playMove,
  });
};

export default usePlayMove;
