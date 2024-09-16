import { IOraCommitToTxHash } from "@/types/ora-network";
import {
  validateOraAiJudgeQueryResponseSchema,
  validateOraTxResponseSchema,
} from "@/validations/ora-network";

import createApi from "./api-factory";

const oraNetworkApi = createApi({ commonPrefix: "ora" });

const commitToTxHash = async (data: IOraCommitToTxHash) => {
  return await oraNetworkApi
    .post("commitment", data)
    .then((res) => validateOraTxResponseSchema.parse(res.data));
};

const getAiJudgeQuery = async (conversationId: string) => {
  return await oraNetworkApi
    .get("query/" + conversationId)
    .then((res) => validateOraAiJudgeQueryResponseSchema.parse(res.data));
};

const oraNetworkService = {
  commitToTxHash,
  getAiJudgeQuery,
};

export default oraNetworkService;
