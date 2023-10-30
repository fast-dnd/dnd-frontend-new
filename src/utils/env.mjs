import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_HJID: z.string().nonempty(),
    NEXT_PUBLIC_HJSV: z.string().nonempty(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().nonempty(),
    NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: z.string().nonempty(),
    NEXT_PUBLIC_WALLET_ENDPOINT: z.string().nonempty(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_HJID: process.env.NEXT_PUBLIC_HJID,
    NEXT_PUBLIC_HJSV: process.env.NEXT_PUBLIC_HJSV,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    NEXT_PUBLIC_WALLET_ENDPOINT: process.env.NEXT_PUBLIC_WALLET_ENDPOINT,
  },
});
