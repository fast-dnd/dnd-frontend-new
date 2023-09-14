import { useQuery } from "@tanstack/react-query";

import roomService, { roomKey } from "@/services/room-service";

const useGetRoomHistory = () => {
  return useQuery({
    queryKey: [roomKey],
    queryFn: roomService.getRoomHistory,
  });
};

export default useGetRoomHistory;
