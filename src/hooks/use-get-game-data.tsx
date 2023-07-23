import { useQuery } from "@tanstack/react-query";

import gameService, { gameKey } from "@/services/game-service";

const useGetGameData = (conversationId: string) => {
  return useQuery({
    queryKey: [gameKey, conversationId],
    queryFn: () => gameService.getGameData(conversationId),
  });
};

export default useGetGameData;
