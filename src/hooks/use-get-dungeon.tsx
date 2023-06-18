"use client";

import dungeonService from "@/services/dungeon-service";
import { useQuery } from "@tanstack/react-query";

const useGetDungeon = (dungeonId?: string) => {
  return useQuery({
    queryKey: ["kingdom", dungeonId],
    queryFn: () => dungeonService.getDungeon(dungeonId || ""),
    enabled: !!dungeonId,
  });
};

export default useGetDungeon;
