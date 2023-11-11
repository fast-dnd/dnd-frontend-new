import { useInfiniteQuery } from "@tanstack/react-query";

import { PAGINATION_LIMIT } from "@/services/api-factory";
import dungeonService, { dungeonKey } from "@/services/dungeon-service";

import { SubTabType } from "@/app/(authed)/home/stores/tab-store";

const useGetDungeons = ({ filter }: { filter: SubTabType }) => {
  return useInfiniteQuery({
    queryKey: [dungeonKey, filter],
    queryFn: ({ pageParam = 1 }) => dungeonService.getDungeons({ pageParam, filter }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.dungeons.length === PAGINATION_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useGetDungeons;
