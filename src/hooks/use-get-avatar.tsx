"use client";

import { useQuery } from "@tanstack/react-query";

import kingdomService, { kingdomKey } from "@/services/kingdom-service";

const useGetAvatar = (avatarId?: string) => {
  return useQuery({
    queryKey: [kingdomKey, avatarId],
    queryFn: () => kingdomService.getAvatar(avatarId || ""),
    enabled: !!avatarId,
  });
};

export default useGetAvatar;
