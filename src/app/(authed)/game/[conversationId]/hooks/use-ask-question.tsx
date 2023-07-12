import { useMutation } from "@tanstack/react-query";

import gameService from "@/services/game-service";

const useAskQuestion = () => {
  return useMutation({ mutationFn: gameService.postQuestion });
};

export default useAskQuestion;
