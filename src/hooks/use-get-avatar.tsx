"use client";

import { useQuery } from "@tanstack/react-query";

import dndService from "@/services/dnd-service";

const useGetAvatar = (avatarId?: string) => {
  return useQuery({
    queryKey: ["kingdom", avatarId],
    queryFn: () => dndService.getAvatar(avatarId || ""),
    enabled: !!avatarId,
  });
};

export default useGetAvatar;
