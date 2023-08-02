import { z } from "zod";

export const transcriptSchema = z.object({
  storyChunk: z.string().nullable(),
  playerAsking: z.string().nullable(),
  question: z.string().nullable(),
  answer: z.string().nullable(),
});

export const transcriptsSchema = z.array(transcriptSchema);

export type ITranscript = z.infer<typeof transcriptSchema>;
