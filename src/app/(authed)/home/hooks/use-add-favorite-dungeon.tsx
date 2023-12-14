import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { accountKey } from "@/services/account-service";
import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useAddFavoriteDungeon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dungeonService.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey]);
      queryClient.invalidateQueries([accountKey]);
      toast.success("Adventure added to favorites");
    },
  });
};

export default useAddFavoriteDungeon;
