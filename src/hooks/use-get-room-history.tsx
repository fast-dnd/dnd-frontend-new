import { useInfiniteQuery } from "@tanstack/react-query";

import { LIMIT } from "@/services/query-helper";
import roomService, { roomKey } from "@/services/room-service";

const useGetRoomHistory = () => {
  return useInfiniteQuery({
    queryKey: [roomKey],
    queryFn: ({ pageParam = 1 }) => roomService.getRoomHistory({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.rooms.length === LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useGetRoomHistory;
