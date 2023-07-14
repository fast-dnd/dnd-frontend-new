"use client";

import { useQuery } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";

const useGetDungeon = (dungeonId?: string) => {
  return useQuery({
    queryKey: [dungeonKey, dungeonId],
    queryFn: () => dungeonService.getDungeon(dungeonId || ""),
    enabled: !!dungeonId,
  });
};

export default useGetDungeon;
