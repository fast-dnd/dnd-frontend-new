import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(1, "Title is required"),
  mission: z.string().min(0),
  description: z.string().min(0),
  transition: z.string().min(0),
});

export type ILocationSchema = z.infer<typeof locationSchema>;
