import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Connection, Keypair } from "@solana/web3.js";

export const solanaConnection = new Connection(
  "https://devnet.helius-rpc.com/?api-key=012259ae-c8e7-430f-b469-58b78c396a79",
);
