import { z } from "zod";

import {
  campaignDetailSchema,
  campaignForBackendSchema,
  campaignSchema,
} from "@/validations/campaign";

export type ICampaign = z.infer<typeof campaignSchema>;

export type ICampaignForBackend = z.infer<typeof campaignForBackendSchema>;

export type ICampaignDetail = z.infer<typeof campaignDetailSchema>;
