import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_HJID: z.string().nonempty(),
    NEXT_PUBLIC_HJSV: z.string().nonempty(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().nonempty(),
    NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: z.string().nonempty(),
    NEXT_PUBLIC_WEB3_API_KEY: z.string().nonempty(),
    NEXT_PUBLIC_VERCEL_ENV: z.enum(["production", "preview", "development"]),
  },
  runtimeEnv: {
    NEXT_PUBLIC_HJID: process.env.NEXT_PUBLIC_HJID,
    NEXT_PUBLIC_HJSV: process.env.NEXT_PUBLIC_HJSV,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    NEXT_PUBLIC_WEB3_API_KEY: process.env.NEXT_PUBLIC_WEB3_API_KEY,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
});
