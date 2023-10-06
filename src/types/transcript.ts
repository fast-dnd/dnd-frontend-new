import { z } from "zod";

import {
  transcriptPlayerSchema,
  transcriptSchema,
  transcriptStorySchema,
} from "@/validations/transcript";

export type ITranscriptPlayer = z.infer<typeof transcriptPlayerSchema>;

export type ITranscriptStory = z.infer<typeof transcriptStorySchema>;

export type ITranscript = z.infer<typeof transcriptSchema>;
