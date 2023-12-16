import { useMutation, useQueryClient } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useCreateDungeonTx = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dungeonService.createDungeonTx,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey]);
    },
  });
};

export default useCreateDungeonTx;
