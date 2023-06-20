import gameService from "@/services/game-service";
import { useMutation } from "@tanstack/react-query";

const usePlayMove = () => {
  return useMutation({
    mutationFn: gameService.playMove,
  });
};

export default usePlayMove;
