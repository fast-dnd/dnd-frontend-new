import dndService from "@/services/dndService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const useCreateRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: dndService.createRoom,
    onSuccess: (data) => router.push(`lobby/${data.data.conversationId}`),
  });
};

export default useCreateRoom;
