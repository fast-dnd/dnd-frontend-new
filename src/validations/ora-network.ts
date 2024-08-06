import { z } from "zod";

export const validateOraTxResponseSchema = z.object({
  transaction: z.string(),
});
