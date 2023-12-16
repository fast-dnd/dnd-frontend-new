"use client";

import { useMemo } from "react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

import { env } from "@/utils/env.mjs";

const CustomWalletProvider = ({ children }: React.PropsWithChildren) => {
  const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network],
  );

  const walletConnectionError = (error: WalletError) => {
    console.log("Wallet Connection Error:\n", error);
    console.log("Wallet Connection Error:\n", WalletError);
  };

  return (
    <ConnectionProvider endpoint={env.NEXT_PUBLIC_WALLET_ENDPOINT}>
      <WalletProvider wallets={wallets} onError={walletConnectionError} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default CustomWalletProvider;
