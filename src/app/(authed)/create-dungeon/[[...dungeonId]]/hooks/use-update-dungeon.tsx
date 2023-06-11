import dndService from "@/services/dndService";
import { useMutation } from "@tanstack/react-query";

const useUpdateDungeon = () => {
  return useMutation({
    mutationFn: dndService.updateDungeon,
  });
};

export default useUpdateDungeon;
