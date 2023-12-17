import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";

import { solanaConnection } from "@/utils/web3/connection";

interface IUseGetWeb3BalanceProps {
  tokenAccountAddress: string;
  mintAddress: string;
}

const useGetWeb3Balance = ({ tokenAccountAddress, mintAddress }: IUseGetWeb3BalanceProps) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const publicKey = new PublicKey(tokenAccountAddress);
        const mint = new PublicKey(mintAddress);

        const tokenAmount = await solanaConnection.getParsedTokenAccountsByOwner(publicKey, {
          mint,
        });

        if (tokenAmount.value.length > 0) {
          setBalance(tokenAmount.value[0].account.data.parsed.info.tokenAmount.uiAmount);
        } else {
          setBalance(0);
        }
      } catch (error) {
        setBalance(0);
      }
    };

    fetchBalance();
  }, [tokenAccountAddress, mintAddress]);

  return balance;
};

export default useGetWeb3Balance;