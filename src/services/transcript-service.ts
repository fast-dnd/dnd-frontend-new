import { transcriptsSchema } from "@/types/transcript";

import createApi from "./api-factory";

const transcriptApi = createApi({ commonPrefix: "transcript" });

const getTranscript = async (conversationId: string) => {
  return await transcriptApi.get(conversationId).then((res) => transcriptsSchema.parse(res.data));
};

const transcriptService = {
  getTranscript,
};

export default transcriptService;

export const transcriptKey = "transcript";
