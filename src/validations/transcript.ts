import { z } from "zod";

export const transcriptPlayerSchema = z.object({
  accountId: z.string(),
  name: z.string(),
  imageUrl: z.string(),
});

export const transcriptStorySchema = z.object({
  storyChunk: z.string(),
  movesInRound: z
    .array(
      z.object({
        playerAccountId: z.string(),
        action: z.string(),
      }),
    )
    .nullish(),
  image: z.string().nullish(),
  title: z.string(),
  question: z.string().nullish(),
  answer: z.string().nullish(),
  playerAsking: z
    .object({
      name: z.string(),
      imageUrl: z.string(),
    })
    .nullish(),
});

export const transcriptSchema = z.object({
  players: z.array(transcriptPlayerSchema),
  story: z.array(transcriptStorySchema),
});
