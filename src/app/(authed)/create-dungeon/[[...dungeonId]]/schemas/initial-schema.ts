import { z } from "zod";

import { dungeonDurationsArray, dungeonTags } from "@/utils/dungeon-options";

export const initialSchema = z.object({
  name: z.string().min(1, "Name is required").min(5, "Name must be at least 5 characters"),
  recommendedResponseDetailsDepth: z.enum(dungeonDurationsArray, {
    errorMap: (issue, ctx) => {
      return { message: "Bob verbal engagement is required" };
    },
  }),
  style: z.string().min(1, "Style is required").min(5, "Style must be at least 5 characters"),
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
  realityLevel: z.number().min(0).max(3),
  actionLevel: z.number().min(0).max(3),
  misteryLevel: z.number().min(0).max(3),
});

export type IInitialSchema = z.infer<typeof initialSchema>;
