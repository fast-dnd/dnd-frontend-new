import { z } from "zod";

import { dungeonDurationsArray, dungeonTags } from "@/utils/dungeon-options";

export const initialSchema = z.object({
  name: z.string().min(1, "Name is required").min(5, "Name must be at least 5 characters"),
  recommendedResponseDetailsDepth: z.enum(dungeonDurationsArray, {
    errorMap: (issue, ctx) => {
      return { message: "Bob verbal engagement is required" };
    },
  }),
  tags: z
    .array(
      z.object({
        label: z.enum(dungeonTags),
        value: z.enum(dungeonTags),
      }),
    )
    .min(1, "Tags are required")
    .max(3, "You can only have 3 tags")
    .refine((tags) => tags.map((tag) => tag.value)),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),
  image: z.string().optional(),
  realityLevel: z
    .number()
    .min(0, "Reality level is required")
    .max(100, "Reality level must be 100 or less"),
  actionLevel: z
    .number()
    .min(0, "Action level is required")
    .max(100, "Action level must be 100 or less"),
  misteryLevel: z
    .number()
    .min(0, "Mistery level is required")
    .max(100, "Mistery level must be 100 or less"),
});

export type IInitialSchema = z.infer<typeof initialSchema>;
