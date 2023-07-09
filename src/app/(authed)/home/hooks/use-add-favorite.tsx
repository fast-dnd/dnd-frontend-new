import { useMutation } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useAddFavorite = () => {
  return useMutation({
    mutationFn: dungeonService.addFavorite,
  });
};

export default useAddFavorite;
