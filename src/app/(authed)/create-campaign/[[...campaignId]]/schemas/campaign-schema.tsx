import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "This field is required").min(5, "Name must be at least 5 characters"),
  description: z
    .string()
    .min(1, "This field is required")
    .min(5, "Description must be at least 5 characters"),
  dungeons: z.array(z.string()),
  image: z.string().optional(),
});

export type ICampaignSchema = z.infer<typeof campaignSchema>;
