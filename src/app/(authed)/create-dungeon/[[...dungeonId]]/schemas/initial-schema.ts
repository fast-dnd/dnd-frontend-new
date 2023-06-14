import { z } from "zod";

export const initialSchema = z.object({
  name: z.string().min(1, "Name is required").min(5, "Name must be at least 5 characters"),
  style: z.string().min(1, "Style is required").min(5, "Style must be at least 5 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),
  image: z.string().optional(),
});

export type IInitialSchema = z.infer<typeof initialSchema>;
