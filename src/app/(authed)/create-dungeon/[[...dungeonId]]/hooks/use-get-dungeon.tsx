"use client";

import dndService from "@/services/dndService";
import { useQuery } from "@tanstack/react-query";

const useGetDungeon = (dungeonId?: string) => {
  if (!dungeonId) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["kingdom", dungeonId],
    queryFn: () => dndService.getDungeon(dungeonId),
  });
};

export default useGetDungeon;
