import { z } from "zod";

export const dungeonSchema = z.object({
  name: z.string().min(1, "This field is required").min(5, "Name must be at least 5 characters"),
  description: z
    .string()
    .min(1, "This field is required")
    .min(5, "Description must be at least 5 characters"),
  image: z.string().optional(),
});

export type IDungeonSchema = z.infer<typeof dungeonSchema>;
