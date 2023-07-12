import { z } from "zod";

import { dungeonTags } from "@/utils/dungeon-options";

export const initialSchema = z.object({
  name: z.string().min(1, "Name is required").min(5, "Name must be at least 5 characters"),
  duration: z.enum(["blitz", "standard", "long"], {
    errorMap: (issue, ctx) => {
      return { message: "Duration is required" };
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
});

export type IInitialSchema = z.infer<typeof initialSchema>;
