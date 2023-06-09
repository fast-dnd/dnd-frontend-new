"use client";

import dndService from "@/services/dndService";
import { useQuery } from "@tanstack/react-query";

const useGetHomeData = () => {
  const recommendedDungeonsQuery = useQuery({
    queryKey: ["recommendedDungeons"],
    queryFn: dndService.getRecommendedDungeons,
  });
  const myDungeonsQuery = useQuery({
    queryKey: ["myDungeons"],
    queryFn: dndService.getDungeons,
  });
  const roomHistoryQuery = useQuery({
    queryKey: ["roomHistory"],
    queryFn: dndService.getRooms,
  });
  const kingdomQuery = useQuery({ queryKey: ["kingdom"], queryFn: dndService.getKingdom });

  return [recommendedDungeonsQuery, myDungeonsQuery, roomHistoryQuery, kingdomQuery] as const;
};

export default useGetHomeData;
