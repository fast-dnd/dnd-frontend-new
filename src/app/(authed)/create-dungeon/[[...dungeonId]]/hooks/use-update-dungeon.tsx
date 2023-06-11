import dungeonService from "@/services/dungeon-service";
import { useMutation } from "@tanstack/react-query";

const useUpdateDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.updateDungeon,
  });
};

export default useUpdateDungeon;
