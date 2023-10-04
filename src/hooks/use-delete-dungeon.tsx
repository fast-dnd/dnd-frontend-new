"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useDeleteDungeon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dungeonService.deleteDungeon,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey, "owned"]);
    },
  });
};

export default useDeleteDungeon;
