"use client";

import dndService from "@/services/dndService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useDeleteDungeon = () => {
  return useMutation({
    mutationFn: dndService.deleteDungeon,
  });
};

export default useDeleteDungeon;
