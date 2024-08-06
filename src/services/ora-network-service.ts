import { IOraValidate } from "@/types/ora-network";
import {
  validateOraAiJudgeQueryResponseSchema,
  validateOraTxResponseSchema,
} from "@/validations/ora-network";

import createApi from "./api-factory";

const oraNetworkApi = createApi({ commonPrefix: "ora" });

const validateTx = async (data: IOraValidate) => {
  return await oraNetworkApi
    .post("transaction", data)
    .then((res) => validateOraTxResponseSchema.parse(res.data));
};

const getAiJudgeQuery = async (conversationId: string) => {
  return await oraNetworkApi
    .get("query/" + conversationId)
    .then((res) => validateOraAiJudgeQueryResponseSchema.parse(res.data));
};

const oraNetworkService = {
  validateTx,
  getAiJudgeQuery,
};

export default oraNetworkService;
