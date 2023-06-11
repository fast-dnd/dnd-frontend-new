import { z } from "zod";

export const championSchema = z.object({
  name: z.string().min(1, "This field is required").min(5, "Name must be at least 5 characters"),
  description: z
    .string()
    .min(1, "This field is required")
    .min(5, "Description must be at least 5 characters"),
  moveMapping: z.object({
    free_will: z.string().optional(),
    discover_health: z
      .string()
      .min(1, "This field is required")
      .min(5, "Move must be at least 5 characters"),
    discover_mana: z
      .string()
      .min(1, "This field is required")
      .min(5, "Move must be at least 5 characters"),
    conversation_with_team: z
      .string()
      .min(1, "This field is required")
      .min(5, "Move must be at least 5 characters"),
    rest: z.string().min(1, "This field is required").min(5, "Move must be at least 5 characters"),
  }),
});

export type IChampionSchema = z.infer<typeof championSchema>;
