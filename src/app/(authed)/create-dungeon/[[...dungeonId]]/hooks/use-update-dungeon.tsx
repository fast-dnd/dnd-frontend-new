import { useMutation } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useUpdateDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.updateDungeon,
  });
};

export default useUpdateDungeon;
