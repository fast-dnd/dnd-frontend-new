import { z } from "zod";

export const avatarSchema = z.object({
  name: z.string().min(1, "This field is required").min(5, "Name must be at least 5 characters"),
  image: z.string().optional(),
});

export type IAvatarSchema = z.infer<typeof avatarSchema>;
