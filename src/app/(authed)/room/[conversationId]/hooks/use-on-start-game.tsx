import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import bs58 from "bs58";

import useCommunity from "@/hooks/helpers/use-community";
import roomService from "@/services/room-service";

import useStartGame from "./use-start-game";

const useOnStartGame = ({ conversationId }: { conversationId: string }) => {
  const { publicKey, signTransaction } = useWallet();

  const { isDefault } = useCommunity();

  const { mutate: startGame, isLoading: isGameStarting } = useStartGame();

  const onStartGame = async () => {
    if (isDefault) startGame({ conversationId });
    else if (publicKey && signTransaction) {
      try {
        const gameStartTx = await roomService.getStartGameTx({ conversationId });
        const transaction = Transaction.from(bs58.decode(gameStartTx.transaction));
        const signedTx = await signTransaction(transaction);

        const serializedTx = bs58.encode(signedTx.serialize());
        startGame({ conversationId, transaction: serializedTx });
      } catch (err) {
        console.log("Error starting game:\n--------------------------\n", err);
      }
    }
  };

  return { onStartGame, isGameStarting };
};

export default useOnStartGame;
