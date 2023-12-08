import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import roomService, { roomKey } from "@/services/room-service";

const useCreateRoom = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [_, setAccountId] = useLocalStorage("accountId", "");

  return useMutation({
    mutationFn: roomService.createRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries([roomKey]);
      if (data.admin) setAccountId(data.admin.accountId);
      router.push(`room/${data.conversationId}`);
    },
  });
};

export default useCreateRoom;
