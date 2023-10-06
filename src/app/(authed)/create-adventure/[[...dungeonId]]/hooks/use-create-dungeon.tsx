import { useMutation, useQueryClient } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useCreateDungeon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dungeonService.createDungeon,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey]);
    },
  });
};

export default useCreateDungeon;
