"use client";

import { useMemo } from "react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

import "@solana/wallet-adapter-react-ui/styles.css";

import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { SolletWalletAdapter } from "@solana/wallet-adapter-sollet";

import { SOLANA_RPC_HOST_DEVNET } from "@/utils/constants";

export default function CustomWalletWrapper({ children }: React.PropsWithChildren) {
  const network = WalletAdapterNetwork.Devnet;

  const networkRPC = SOLANA_RPC_HOST_DEVNET;
  const endpoint = useMemo(() => networkRPC, [networkRPC]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new BackpackWalletAdapter({ network }),
      new SolletWalletAdapter({ network }),
    ],
    [network],
  );

  const walletConnectionError = (error: WalletError) => {
    console.log("Wallet Connection Error:\n", error);
    console.log("Wallet Connection Error:\n", WalletError);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={walletConnectionError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
