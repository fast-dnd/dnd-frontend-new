import { Connection } from "@solana/web3.js";

import { rpcNodeURL } from "./rpc-url";

export const solanaConnection = new Connection(rpcNodeURL);
