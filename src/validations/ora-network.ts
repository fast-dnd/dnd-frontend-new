import { z } from "zod";

export const validateOraTxResponseSchema = z.object({
  transaction: z.string(),
});

export const validateOraAiJudgeQueryResponseSchema = z.object({
  query: z.string(),
  queryNormalized: z.string(),
});
