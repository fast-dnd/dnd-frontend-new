import { z } from "zod";

import { transcriptSchema } from "@/validations/transcript";

export type ITranscript = z.infer<typeof transcriptSchema>;
