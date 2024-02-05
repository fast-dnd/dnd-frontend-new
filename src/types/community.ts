import { z } from "zod";

import { communitiesSchema, communitySchema } from "@/validations/community";

export type ICommunity = z.infer<typeof communitySchema>;

export type ICommunities = z.infer<typeof communitiesSchema>;
