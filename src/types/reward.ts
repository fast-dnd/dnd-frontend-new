import { z } from "zod";

import { rewardSchema } from "@/validations/reward";

export type IReward = z.infer<typeof rewardSchema>;
