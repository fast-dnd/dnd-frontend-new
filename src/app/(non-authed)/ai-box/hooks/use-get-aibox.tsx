import { useQuery } from "@tanstack/react-query";

import aiBoxService, { aiBoxKey } from "@/services/aibox-service";

const useGetAiBox = (boxId?: string) => {
  return useQuery({
    queryKey: [aiBoxKey, boxId],
    queryFn: () => aiBoxService.getAiBox({ boxId }),
  });
};

export default useGetAiBox;
