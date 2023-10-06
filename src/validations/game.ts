import { z } from "zod";

export const diceBreakdownSchema = z.object({
  dice: z.number(),
  mana: z.number(),
  bonusApplied: z.number(),
  aiDiceBonus: z.number(),
});

export const playMoveResponseSchema = z.object({
  dice: z.number(),
  diceAfterBonus: z.number(),
  diceBreakdown: diceBreakdownSchema,
});
