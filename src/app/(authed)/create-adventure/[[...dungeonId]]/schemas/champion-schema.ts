import { z } from "zod";

export const championSchema = z.object({
  name: z.string().min(1, "Name is required").min(5, "Name must be at least 5 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),
  moveMapping: z.object({
    free_will: z.string().optional(),
    discover_health: z
      .string()
      .min(1, "Heal action is required")
      .min(5, "Heal action must be at least 5 characters"),
    discover_mana: z
      .string()
      .min(1, "Mana action is required")
      .min(5, "Mana action must be at least 5 characters"),
    conversation_with_team: z
      .string()
      .min(1, "Team action is required")
      .min(5, "Team action must be at least 5 characters"),
    rest: z
      .string()
      .min(1, "Rest action is required")
      .min(5, "Rest action must be at least 5 characters"),
  }),
});

export type IChampionSchema = z.infer<typeof championSchema>;
