import { z } from "zod";

export const validateTournamentsResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  season: z.number(),
  communities: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      description: z.string(),
      logoImageUrl: z.string().url(),
    }),
  ),
});
