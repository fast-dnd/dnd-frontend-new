import dndService from "@/services/dndService";
import { useMutation } from "@tanstack/react-query";

const useCreateDungeon = () => {
  return useMutation({
    mutationFn: dndService.createDungeon,
  });
};

export default useCreateDungeon;
