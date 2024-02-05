import { WalletError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import bs58 from "bs58";
import { toast } from "sonner";

import { accountKey } from "@/services/account-service";
import dungeonService, { dungeonKey } from "@/services/dungeon-service";

interface IUseOnWithdrawAdventureCurrencyProps {
  dungeonId: string;
  amount: number;
}

const useOnWithdrawAdventureCurrency = ({
  dungeonId,
  amount,
}: IUseOnWithdrawAdventureCurrencyProps) => {
  const { publicKey, signTransaction } = useWallet();

  const queryclient = useQueryClient();

  const { mutate: withdraw } = useMutation({ mutationFn: dungeonService.withdraw });
  const { mutate: withdrawTx } = useMutation({ mutationFn: dungeonService.withdrawTx });

  const onWithdrawAdventureCurrency = () => {
    if (publicKey && signTransaction) {
      withdrawTx(
        {
          dungeonId,
          amount,
        },
        {
          onSuccess: async (data) => {
            try {
              const transaction = Transaction.from(bs58.decode(data.transaction as string));
              const signedTx = await signTransaction(transaction);

              const serializedTx = bs58.encode(signedTx.serialize());
              withdraw(
                {
                  transaction: serializedTx,
                },
                {
                  onSuccess: () => {
                    toast.success(`Added ${amount} to your wallet!`);
                    queryclient.invalidateQueries([dungeonKey, dungeonId]);
                    queryclient.invalidateQueries([accountKey]);
                  },
                },
              );
            } catch (err) {
              if (err instanceof WalletError) toast.error(err.message);
              else console.log("Error withdrawing balance:\n--------------------------\n", err);
            }
          },
        },
      );
    }
  };

  return { onWithdrawAdventureCurrency };
};

export default useOnWithdrawAdventureCurrency;
