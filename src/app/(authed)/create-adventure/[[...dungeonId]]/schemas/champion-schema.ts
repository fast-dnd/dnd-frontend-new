import { z } from "zod";

export const championSchema = z.object({
  name: z.string().min(1, "Name is required").min(5, "Name must be at least 5 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),
  imageUrl: z.string().optional().nullable(),
});

export type IChampionSchema = z.infer<typeof championSchema>;
