import { useMutation, useQueryClient } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useUpdateDungeon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dungeonService.updateDungeon,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey]);
    },
  });
};

export default useUpdateDungeon;
