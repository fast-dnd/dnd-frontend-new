"use client";

import { useMutation } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useDeleteDungeon = () => {
  return useMutation({
    mutationFn: dungeonService.deleteDungeon,
  });
};

export default useDeleteDungeon;
