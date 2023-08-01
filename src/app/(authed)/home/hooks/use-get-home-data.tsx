"use client";

import { useQuery } from "@tanstack/react-query";

import campaignService, { campaignKey } from "@/services/campaign-service";
import dungeonService, { dungeonKey } from "@/services/dungeon-service";
import roomService, { roomKey } from "@/services/room-service";

export const useGetRecommendedDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: [dungeonKey, "recommendedDungeons"],
    queryFn: dungeonService.getRecommendedDungeons,
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

export const useGetRecentDungeons = (enabled: boolean) => {
  return useQuery({
    queryKey: [dungeonKey, "recent"],
    queryFn: dungeonService.getRecent,
    enabled,
  });
};

export const useGetRecommendedCampaigns = (enabled: boolean) => {
  return useQuery({
    queryKey: [campaignKey, "recommended"],
    queryFn: campaignService.getRecommended,
    enabled,
  });
};

export const useGetFavoriteCampaigns = (enabled: boolean) => {
  return useQuery({
    queryKey: [campaignKey, "favorite"],
    queryFn: campaignService.getFavorites,
    enabled,
  });
};

export const useGetMyCampaigns = (enabled: boolean) => {
  return useQuery({
    queryKey: [campaignKey, "owned"],
    queryFn: campaignService.getMyCampaigns,
    enabled,
  });
};

export const useGetRecentCampaigns = (enabled: boolean) => {
  return useQuery({
    queryKey: [campaignKey, "owned"],
    queryFn: campaignService.getRecent,
    enabled,
  });
};
