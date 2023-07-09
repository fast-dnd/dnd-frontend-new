"use client";

import { useQuery } from "@tanstack/react-query";

import dungeonService from "@/services/dungeon-service";
import roomService from "@/services/room-service";

export const useGetRecommendedDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: ["recommendedDungeons"],
    queryFn: dungeonService.getRecommendedDungeons,
    enabled,
  });
};

export const useGetMyDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: ["myDungeons"],
    queryFn: dungeonService.getDungeons,
    enabled,
  });
};

export const useGetRoomHistory = () => {
  return useQuery({
    queryKey: ["roomHistory"],
    queryFn: roomService.getRooms,
  });
};

export const useGetFavoriteDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: dungeonService.getFavorites,
    enabled,
  });
};
