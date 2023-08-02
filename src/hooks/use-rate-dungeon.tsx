import { useMutation } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useRateDungeon = () => {
  return useMutation({ mutationFn: dungeonService.rateDungeon });
};

export default useRateDungeon;
