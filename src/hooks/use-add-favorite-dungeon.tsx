import { useMutation, useQueryClient } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useAddFavoriteDungeon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dungeonService.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey, "favorite"]);
    },
  });
};

export default useAddFavoriteDungeon;
