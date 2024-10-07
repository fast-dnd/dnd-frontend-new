import { IOraABoxCommitToTxHash, IOraCBCommitToTxHash } from "@/types/ora-network";
import {
  validateOraAiJudgeQueryResponseSchema,
  validateOraTxResponseSchema,
} from "@/validations/ora-network";

import createApi from "./api-factory";

const oraNetworkApi = createApi({ commonPrefix: "ora" });

const cbCommitToTxHash = async (data: IOraCBCommitToTxHash) => {
  return await oraNetworkApi
    .post("/cb/commitment", data)
    .then((res) => validateOraTxResponseSchema.parse(res.data));
};

const cbGetAiJudgeQuery = async (conversationId: string) => {
  return await oraNetworkApi
    .get("cb/query/" + conversationId)
    .then((res) => validateOraAiJudgeQueryResponseSchema.parse(res.data));
};

const abCommitToTxHash = async (data: IOraABoxCommitToTxHash) => {
  return await oraNetworkApi
    .post("/ab/commitment", data)
    .then((res) => validateOraTxResponseSchema.parse(res.data));
};

const oraNetworkService = {
  cbCommitToTxHash,
  cbGetAiJudgeQuery,
  abCommitToTxHash,
};

export default oraNetworkService;
