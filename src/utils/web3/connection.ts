import { Connection } from "@solana/web3.js";

import { env } from "../env.mjs";

export const solanaConnection = new Connection(env.NEXT_PUBLIC_RPC_ENDPOINT);
