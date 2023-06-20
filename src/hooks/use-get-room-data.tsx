import roomService from "@/services/room-service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetRoomData = (conversationId: string) => {
  return useQuery({
    queryKey: ["room", conversationId],
    queryFn: () => roomService.getRoomData(conversationId),
  });
};

export default useGetRoomData;
