import { useMutation } from "@tanstack/react-query";

import roomService from "@/services/room-service";

const useUpdateAvatar = () => {
  return useMutation({ mutationFn: roomService.editAvatar });
};

export default useUpdateAvatar;
