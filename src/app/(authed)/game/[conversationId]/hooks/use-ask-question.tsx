import gameService from "@/services/game-service";
import { useMutation } from "@tanstack/react-query";

const useAskQuestion = () => {
  return useMutation({ mutationFn: gameService.postQuestion });
};

export default useAskQuestion;
