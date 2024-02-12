import { env } from "../env.mjs";

const net = env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "mainnet" : "devnet";

export const rpcNodeURL = `https://${net}.helius-rpc.com/?api-key=${env.NEXT_PUBLIC_WEB3_API_KEY}`;

// https://devnet.helius-rpc.com/?api-key=e9221331-e94c-45fa-bcc4-09e6550ebcdb
