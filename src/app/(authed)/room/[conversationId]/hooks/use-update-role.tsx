import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";

const useUpdateRole = () => {
  return useMutation({ mutationFn: roomService.editChampion });
};

export default useUpdateRole;
