import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useAddFavoriteDungeon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dungeonService.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey]);
      toast.success("Adventure added to favorites");
    },
  });
};

export default useAddFavoriteDungeon;
