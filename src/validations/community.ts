import { z } from "zod";

export const communitySchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.enum(["web3", "web2"]),
  address: z.string(),
  bannerImgUrl: z.string(),
  tokenImgUrl: z.string(),
  backgroundImgUrl: z.string(),
  basePrice: z.number(),
  poolShare: z.number(),
  creatorShare: z.number(),
  feeShare: z.number(),
  gameCurrency: z.string(),
  rewardPool: z.string(),
});

export const communitiesSchema = z.array(communitySchema);
