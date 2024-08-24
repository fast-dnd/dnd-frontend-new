import { z } from "zod";

export const tournamentCommunitySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  logoImageUrl: z.string(),
  engagement: z.number(),
});

export const tournamentSchema = z.object({
  name: z.string(),
  season: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  communities: z.array(tournamentCommunitySchema),
});

export type ITournament = z.infer<typeof tournamentSchema>;
