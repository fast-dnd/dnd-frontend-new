"use client";

import dndService from "@/services/dnd-service";
import { useQuery } from "@tanstack/react-query";

const useGetAvatar = (avatarId?: string) => {
  if (!avatarId) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["kingdom", avatarId],
    queryFn: () => dndService.getAvatar(avatarId),
  });
};

export default useGetAvatar;
