import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(1, "This field is required")
    .min(5, "Name must be at least 5 characters"),
  image: z.string().optional(),
});

export type IEditProfileSchema = z.infer<typeof editProfileSchema>;
