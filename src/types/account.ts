import { z } from "zod";

import { accountSchema } from "@/validations/account";

export type IAccount = z.infer<typeof accountSchema>;
