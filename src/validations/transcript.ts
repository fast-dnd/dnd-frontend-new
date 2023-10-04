import { z } from "zod";

export const transcriptSchema = z.object({
  players: z.array(
    z.object({
      accountId: z.string(),
      name: z.string(),
      imageUrl: z.string(),
    }),
  ),
  story: z.array(
    z.object({
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
    }),
  ),
});
