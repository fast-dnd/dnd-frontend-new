import { useQuery } from "@tanstack/react-query";

import transcriptService, { transcriptKey } from "@/services/transcript-service";

const useGetTranscript = (conversationId: string) => {
  return useQuery({
    queryKey: [transcriptKey, conversationId],
    queryFn: () => transcriptService.getTranscript(conversationId),
  });
};

export default useGetTranscript;
