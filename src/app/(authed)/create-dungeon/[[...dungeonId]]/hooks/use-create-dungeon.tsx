import dungeonService from "@/services/dungeon-service";
import { useMutation } from "@tanstack/react-query";

const useCreateDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.createDungeon,
  });
};

export default useCreateDungeon;
