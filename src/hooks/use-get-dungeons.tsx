import { useInfiniteQuery } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";
import { LIMIT } from "@/services/query-helper";

const useGetDungeons = ({ filter }: { filter: string }) => {
  return useInfiniteQuery({
    queryKey: [dungeonKey, filter],
    queryFn: ({ pageParam = 1 }) => dungeonService.getDungeons({ pageParam, filter }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.dungeons.length === LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useGetDungeons;
