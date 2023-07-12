import { useMutation } from "@tanstack/react-query";

import roomService from "@/services/room-service";

const useUpdateRole = () => {
  return useMutation({ mutationFn: roomService.editChampion });
};

export default useUpdateRole;
