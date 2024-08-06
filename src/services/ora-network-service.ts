import { IOraValidate } from "@/types/ora-network";
import { validateOraTxResponseSchema } from "@/validations/ora-network";

import createApi from "./api-factory";

const oraNetworkApi = createApi({ commonPrefix: "ora" });

const validateTx = async (data: IOraValidate) => {
  return await oraNetworkApi
    .post("transaction", data)
    .then((res) => validateOraTxResponseSchema.parse(res.data));
};

const oraNetworkService = {
  validateTx,
};

export default oraNetworkService;
