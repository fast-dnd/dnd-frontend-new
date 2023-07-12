import { useMutation } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useCreateDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.createDungeon,
  });
};

export default useCreateDungeon;
