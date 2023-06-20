"use client";

import dndService from "@/services/dnd-service";
import { useQuery } from "@tanstack/react-query";

const useGetAvatar = (avatarId?: string) => {
  return useQuery({
    queryKey: ["kingdom", avatarId],
    queryFn: () => dndService.getAvatar(avatarId || ""),
    enabled: !!avatarId,
  });
};

export default useGetAvatar;
