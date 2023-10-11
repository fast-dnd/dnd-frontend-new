import { useMutation } from "@tanstack/react-query";

import gameService from "@/services/game-service";

const useSubmitMove = () => {
  return useMutation({
    mutationFn: gameService.playMove,
  });
};

export default useSubmitMove;
