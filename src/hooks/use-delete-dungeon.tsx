"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useDeleteDungeon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dungeonService.deleteDungeon,
    onSuccess: () => {
      queryClient.invalidateQueries([dungeonKey, "owned"]);
      toast.success("Adventure deleted successfully!");
    },
  });
};

export default useDeleteDungeon;
