"use client";

import { useQuery } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";

const useGetDungeon = (dungeonId?: string) => {
  return useQuery({
    queryKey: ["kingdom", dungeonId],
    queryFn: () => dungeonService.getDungeon(dungeonId || ""),
    enabled: !!dungeonId,
  });
};

export default useGetDungeon;
