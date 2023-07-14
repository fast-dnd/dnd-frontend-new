import { useQuery } from "@tanstack/react-query";

import roomService, { roomKey } from "@/services/room-service";

const useGetRoomData = (conversationId: string) => {
  return useQuery({
    queryKey: [roomKey, conversationId],
    queryFn: () => roomService.getRoomData(conversationId),
  });
};

export default useGetRoomData;
