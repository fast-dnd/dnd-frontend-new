import { useQuery } from "@tanstack/react-query";

import aiBoxService, { aiBoxKey } from "@/services/aibox-service";

const useGetAiBox = () => {
  return useQuery({
    queryKey: [aiBoxKey],
    queryFn: () => aiBoxService.getLatestAiBox(),
  });
};

export default useGetAiBox;
