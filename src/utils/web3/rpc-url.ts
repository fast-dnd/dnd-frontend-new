import { env } from "../env.mjs";

const net = env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "mainnet" : "mainnet"; //devnet

export const rpcNodeURL = `https://${net}.helius-rpc.com/?api-key=${env.NEXT_PUBLIC_WEB3_API_KEY}`;
