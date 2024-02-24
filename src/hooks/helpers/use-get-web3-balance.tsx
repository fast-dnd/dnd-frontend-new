import { useEffect, useState } from "react";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

import { solanaConnection } from "@/utils/web3/connection";

interface IUseGetWeb3BalanceProps {
  accountAddress: string;
  mintAddress: string;
}

const useGetWeb3Balance = ({ accountAddress, mintAddress }: IUseGetWeb3BalanceProps) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const accountPk = new PublicKey(accountAddress);
        const mintPk = new PublicKey(mintAddress);
        const userTokenPubKey = getAssociatedTokenAddressSync(mintPk, accountPk);
        const tokenAmount = await solanaConnection.getTokenAccountBalance(userTokenPubKey);
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
  }, [accountAddress, mintAddress]);

  return balance;
};

export default useGetWeb3Balance;
