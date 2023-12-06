import { useCallback, useEffect } from "react";
import Image from "next/image";
import { Wallet } from "@phosphor-icons/react";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { useWallet } from "@solana/wallet-adapter-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import useSolanaLogin from "../hooks/use-solana-login";

const SolanaLogin = () => {
  const { signMessage, wallet, publicKey, wallets, select, disconnect, connecting } = useWallet();
  const { mutate: solanaLogin } = useSolanaLogin();

  const handleSignMessage = useCallback(async () => {
    if (!publicKey || !wallet || !signMessage) return;

    try {
      const encodedMessage = new TextEncoder().encode("I want to connect my wallet to v3rpg");
      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);

      solanaLogin({ signature, walletAddress: publicKey });
    } catch (error) {
      console.log(error);
    }
  }, [solanaLogin, publicKey, signMessage, wallet]);

  useEffect(() => {
    if (publicKey) handleSignMessage();
  }, [handleSignMessage, publicKey]);

  return (
    <Dialog>
      <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-white bg-black px-6 py-4 font-semibold transition-all duration-300 hover:bg-white/10 active:bg-white/25">
        {connecting ? (
          "Connecting..."
        ) : publicKey ? (
          <button onClick={disconnect} className="flex gap-2">
            {publicKey.toBase58().slice(0, 1)}...{publicKey.toBase58().slice(-1)}
            <p>Disconnect wallet</p>
          </button>
        ) : (
          <DialogTrigger className="flex items-center gap-2">
            <Wallet />
            CONNECT WALLET
          </DialogTrigger>
        )}
      </div>
      <DialogContent>
        {wallets.filter((wallet) => wallet.readyState === "Installed").length > 0 ? (
          wallets
            .filter((wallet) => wallet.readyState === "Installed")
            .map((wallet) => (
              <button
                key={wallet.adapter.name}
                onClick={() => select(wallet.adapter.name)}
                className="flex gap-2 rounded-lg bg-white/20 p-2"
              >
                <Image src={wallet.adapter.icon} alt={wallet.adapter.name} height={24} width={24} />
                {wallet.adapter.name}
              </button>
            ))
        ) : (
          <p>No wallet found. Please download a supported Solana wallet</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SolanaLogin;
