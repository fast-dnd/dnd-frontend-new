import { PublicKey } from "@solana/web3.js";

import { solanaConnection } from "./connection";

export const getBalance = async (tokenAccountAddress: string, mintAddress: string) => {
  const tokenAmount = await solanaConnection.getParsedTokenAccountsByOwner(
    new PublicKey(tokenAccountAddress ?? ""),
    {
      mint: new PublicKey(mintAddress ?? ""),
    },
  );

  if (tokenAmount.value.length > 0) {
    return tokenAmount.value[0].account.data.parsed.info.tokenAmount.uiAmount;
  }
  return 0;
};
