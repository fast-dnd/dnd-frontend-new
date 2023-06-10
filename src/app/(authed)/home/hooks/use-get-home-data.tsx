"use client";

import dndService from "@/services/dndService";
import { useQuery } from "@tanstack/react-query";

export const useGetRecommendedDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: ["recommendedDungeons"],
    queryFn: dndService.getRecommendedDungeons,
    enabled,
  });
};

export const useGetMyDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: ["myDungeons"],
    queryFn: dndService.getDungeons,
    enabled,
  });
};

export const useGetRoomHistory = () => {
  return useQuery({
    queryKey: ["roomHistory"],
    queryFn: dndService.getRooms,
  });
};

export const useGetKingdom = () => {
  return useQuery({
    queryKey: ["kingdom"],
    queryFn: dndService.getKingdom,
  });
};
