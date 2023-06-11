"use client";

import dungeonService from "@/services/dungeon-service";
import { useQuery } from "@tanstack/react-query";

const useGetDungeon = (dungeonId?: string) => {
  if (!dungeonId) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["kingdom", dungeonId],
    queryFn: () => dungeonService.getDungeon(dungeonId),
  });
};

export default useGetDungeon;
