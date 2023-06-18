import roomService from "@/services/room-service";
import { useMutation } from "@tanstack/react-query";

const useStartGame = () => {
  return useMutation({ mutationFn: roomService.startGame });
};

export default useStartGame;
