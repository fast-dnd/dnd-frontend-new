import { useMutation } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";
import { toast } from "react-toastify";

const useRateDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.rateDungeon,
    onSuccess: () => {
      toast.success("Thanks for the feedback!");
    },
  });
};

export default useRateDungeon;
