import { useMutation } from "@tanstack/react-query";

import roomService from "@/services/room-service";

const useStartGame = () => {
  return useMutation({ mutationFn: roomService.startGame });
};

export default useStartGame;
