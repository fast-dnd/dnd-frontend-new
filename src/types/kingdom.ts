import { z } from "zod";

export const avatarSchema = z.object({
  _id: z.string(),
  name: z.string(),
  energy: z.number(),
  level: z.number(),
  kingdomId: z.string(),
  imageUrl: z.string().optional(),
});

export const kingdomSchema = z.object({
  avatars: z.array(avatarSchema),
  name: z.string(),
  gold: z.number(),
});

export type IAvatar = z.infer<typeof avatarSchema>;

export type IKingdom = z.infer<typeof kingdomSchema>;
