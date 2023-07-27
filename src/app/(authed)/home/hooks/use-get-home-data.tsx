"use client";

import { useQuery } from "@tanstack/react-query";

import dungeonService, { dungeonKey } from "@/services/dungeon-service";
import roomService, { roomKey } from "@/services/room-service";

export const useGetRecommendedDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: [dungeonKey, "recommendedDungeons"],
    queryFn: dungeonService.getRecommendedDungeons,
    enabled,
  });
};

export const useGetMyDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: [dungeonKey, "myDungeons"],
    queryFn: dungeonService.getMyDungeons,
    enabled,
  });
};

export const useGetRoomHistory = () => {
  return useQuery({
    queryKey: [roomKey, "roomHistory"],
    queryFn: roomService.getRooms,
  });
};

export const useGetFavoriteDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: [dungeonKey, "favorites"],
    queryFn: dungeonService.getFavorites,
    enabled,
  });
};
