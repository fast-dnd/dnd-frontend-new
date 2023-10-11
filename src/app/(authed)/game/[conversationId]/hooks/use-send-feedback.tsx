import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import gameService from "@/services/game-service";

const useSendFeedback = () => {
  return useMutation({
    mutationFn: gameService.postComplaint,
    onSuccess: () => toast.success("Feedback sent!"),
  });
};

export default useSendFeedback;
