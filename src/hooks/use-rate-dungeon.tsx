import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import dungeonService from "@/services/dungeon-service";

const useRateDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.rateDungeon,
    onSuccess: () => {
      toast.success("Thanks for the feedback!");
    },
  });
};

export default useRateDungeon;
