import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";

const useUpdateAvatar = () => {
  return useMutation({ mutationFn: roomService.editAvatar });
};

export default useUpdateAvatar;
