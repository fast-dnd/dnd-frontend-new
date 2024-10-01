import { z } from "zod";

export const txSchema = z.object({
  createdAt: z.string(),
  chain: z.number(),
  txHash: z.string(),
  rating: z.number(),
});

export const aiBoxSchema = z.object({
  aiBoxId: z.string(),
  epoch: z.number(),
  startDate: z.number(),
  endDate: z.number(),
  prize: z.number(),
  prizeToken: z.string(),
  query: z.string(),
  handicap: z.string(),
  prompt: z.string().nullable(),
  oraQuery: z.string().nullable(),
  rating: z.number(),
  transactions: z.array(txSchema),
});

export type IAiBox = z.infer<typeof aiBoxSchema>;
