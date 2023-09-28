import { useMutation } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useAddFavoriteDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.addFavorite,
  });
};

export default useAddFavoriteDungeon;
