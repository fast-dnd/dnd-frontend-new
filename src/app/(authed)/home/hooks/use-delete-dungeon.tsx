"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useDeleteDungeon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dungeonService.deleteDungeon,
    onSuccess: () => {
      queryClient.invalidateQueries(["myDungeons"]);
    },
  });
};

export default useDeleteDungeon;
