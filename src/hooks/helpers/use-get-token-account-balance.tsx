import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";

import { solanaConnection } from "@/utils/web3/connection";

const useGetTokenAccountBalance = (tokenAccountAddress: string) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const publicKey = new PublicKey(tokenAccountAddress);
        const tokenAmount = await solanaConnection.getTokenAccountBalance(publicKey);
        if (tokenAmount.value.uiAmount) {
          setBalance(tokenAmount.value.uiAmount);
        } else {
          setBalance(0);
        }
      } catch (error) {
        setBalance(0);
      }
    };

    fetchBalance();
  }, [tokenAccountAddress]);

  return balance;
};

export default useGetTokenAccountBalance;
