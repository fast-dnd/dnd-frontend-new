import { z } from "zod";

export const transcriptSchema = z.object({
  players: z.array(
    z.object({
      accountId: z.string(),
      name: z.string(),
      avatarImageUrl: z.string(),
    }),
  ),
  story: z.array(
    z.object({
      title: z.string(),
      storyChunk: z.string(),
      image: z.string().nullish(),
      movesInRound: z
        .array(
          z.object({
            playerAccountId: z.string(),
            action: z.string(),
          }),
        )
        .nullish(),
    }),
  ),
});

export type ITranscript = z.infer<typeof transcriptSchema>;
