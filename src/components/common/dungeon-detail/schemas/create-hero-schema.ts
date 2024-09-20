import { z } from "zod";

export const createHeroSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().nullable().optional(),
});

export type ICreateHeroSchema = z.infer<typeof createHeroSchema>;
