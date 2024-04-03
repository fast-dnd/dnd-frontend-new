import Image from "next/image";
import { Wallet } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useWallet } from "@solana/wallet-adapter-react";
import { AiOutlineClose } from "react-icons/ai";
import { useWindowSize } from "usehooks-ts";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

const SolanaLogin = () => {
  const { width } = useWindowSize();

  const { publicKey, wallets, select, disconnect, connecting } = useWallet();

  return (
    <Dialog>
      <div
        className={cn(
          "w-full rounded-b-md bg-white text-sm font-bold tracking-wider text-black transition-all duration-300 lg:rounded-md lg:border-2 lg:border-white/30 lg:bg-white/10 lg:text-xl lg:tracking-normal lg:text-white lg:hover:bg-white/20 lg:active:bg-white/25",
          isProd && "pointer-events-none opacity-50",
        )}
      >
        {connecting ? (
          <p className="flex w-full flex-row items-center justify-center px-4 py-3 uppercase max-lg:pl-36 lg:px-6 lg:py-5">
            Connecting...
          </p>
        ) : publicKey ? (
          <button
            className="flex w-full flex-row items-center justify-center gap-2 px-4 py-3 uppercase max-lg:pl-36 lg:px-6 lg:py-5"
            onClick={disconnect}
          >
            <span className="max-lg:hidden">
              {publicKey.toBase58().slice(0, 1)}...{publicKey.toBase58().slice(-1)}
            </span>
            <p>Disconnect wallet</p>
          </button>
        ) : (
          <DialogTrigger
            className="flex w-full flex-row items-center justify-center gap-2 px-4 py-3 uppercase max-lg:pl-36 lg:px-6 lg:py-5"
            disabled={isProd}
          >
            <Wallet className="max-lg:hidden" />
            CONNECT WALLET
          </DialogTrigger>
        )}
      </div>
      <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end lg:hidden">
            <DialogClose>
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-lg uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              Connect a wallet
            </p>
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
          </div>
          <p className="text-center font-light lg:w-[450px] lg:text-xl lg:tracking-[1.5px]">
            Choose one of the options below to connect to <span className="font-bold">Solana</span>
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {wallets.map((wallet) => (
            <DialogClose key={wallet.adapter.name} asChild>
              <button
                onClick={() => select(wallet.adapter.name)}
                disabled={width !== 0 && width > 1024 && wallet.readyState !== "Installed"}
                className={cn(
                  "flex w-full items-center justify-between rounded-md p-2 pr-6",
                  wallet.readyState === "Installed" && "hover:bg-white/10",
                )}
              >
                <div className="flex items-center gap-5 lg:gap-9">
                  <Image
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    height={52}
                    width={52}
                    className="max-lg:size-10"
                  />
                  <p className="text-xl font-medium tracking-[1.5px]">{wallet.adapter.name}</p>
                </div>
                <p
                  className={cn(
                    "font-light uppercase tracking-[1.5px] text-white/30 lg:text-xl",
                    wallet.readyState !== "Installed" && "hidden",
                  )}
                >
                  Detected
                </p>
              </button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SolanaLogin;
