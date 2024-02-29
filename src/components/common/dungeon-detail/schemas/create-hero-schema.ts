import { z } from "zod";

export const createHeroSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  moveMapping: z.object({
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

export type ICreateHeroSchema = z.infer<typeof createHeroSchema>;
