import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import communityService from "@/services/community-service";

const useBuildCommunity = () => {
  return useMutation({
    mutationFn: communityService.buildCommunity,
    onSuccess: () => {
      toast.success("Message sent successfully");
    },
  });
};

export default useBuildCommunity;
