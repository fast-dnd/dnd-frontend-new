import { z } from "zod";

export const accountSchema = z.object({
  _id: z.string(),
  loginId: z.string(),
  loginType: z.string(),
  properties: z.object({
    email: z.string(),
    _id: z.string(),
  }),
  favouriteDungeons: z.array(z.string()),
  coins: z.number(),
  dmCurrency: z.number(),
});

export type IAccount = z.infer<typeof accountSchema>;
