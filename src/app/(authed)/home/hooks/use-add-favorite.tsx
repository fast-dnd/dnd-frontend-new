import dungeonService from "@/services/dungeon-service";
import { useMutation } from "@tanstack/react-query";

const useAddFavorite = () => {
  return useMutation({
    mutationFn: dungeonService.addFavorite,
  });
};

export default useAddFavorite;
