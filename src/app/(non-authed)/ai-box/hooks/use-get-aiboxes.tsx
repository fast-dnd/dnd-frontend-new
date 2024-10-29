import { useInfiniteQuery } from "@tanstack/react-query";

import aiBoxService, { aiBoxKey } from "@/services/aibox-service";
import { PAGINATION_LIMIT } from "@/services/api-factory";

const useGetAiBoxes = () => {
  return useInfiniteQuery({
    queryKey: [aiBoxKey],
    queryFn: ({ pageParam = 1 }) => aiBoxService.getAiBoxes({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.boxes.length === PAGINATION_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useGetAiBoxes;
