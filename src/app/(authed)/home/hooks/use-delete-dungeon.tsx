"use client";

import dungeonService from "@/services/dungeon-service";
import { useMutation } from "@tanstack/react-query";

const useDeleteDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.deleteDungeon,
  });
};

export default useDeleteDungeon;
