"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { WalletError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { Game } from "iconsax-react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

import MobileNavbar from "@/components/navbar/mobile-navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import SolanaLogin from "./components/solana-login";
import useLogin from "./hooks/use-login";
import useSlides from "./hooks/use-slides";
import useSolanaLogin from "./hooks/use-solana-login";
import { slides } from "./utils/slides";

const Login = () => {
  const [current, setCurrent] = useSlides();
  const { signMessage, wallet, publicKey, wallets, select, disconnect, connecting } = useWallet();
  const { mutate: login } = useLogin();
  const { mutate: solanaLogin } = useSolanaLogin();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => login({ credential: tokenResponse.access_token }),
  });
  const handleSignMessage = useCallback(async () => {
    if (!publicKey || !wallet || !signMessage) return;

    try {
      const encodedMessage = new TextEncoder().encode("I want to connect my wallet to v3rpg");
      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);

      solanaLogin({ signature, walletAddress: publicKey });
    } catch (error) {
      if (error instanceof WalletError) toast.error(error.message);
      else console.log("Error signing message\n----------------------\n", error);
    }
  }, [publicKey, wallet, signMessage, solanaLogin]);

  useEffect(() => {
    if (publicKey) handleSignMessage();
  }, [publicKey, handleSignMessage]);

  return (
    <div className="fixed inset-0 flex h-full items-end justify-center">
      <div className="flex h-full w-full flex-col gap-8 lg:hidden">
        <MobileNavbar />
        <div className="flex w-full flex-col items-center gap-6 overflow-y-auto px-4">
          <p className="text-xl font-bold uppercase tracking-[2.8px]">Hop right in!</p>
          <div className="flex w-full flex-col gap-8 pb-8">
            <div className="relative flex w-full flex-col rounded-md border border-white/10 bg-black">
              <div className="flex w-full flex-col gap-3 p-4 pl-[108px]">
                <p className="font-semibold uppercase leading-none tracking-[2.2px]">Casual play</p>
                <p className="min-h-[32px] text-sm font-light leading-[112%] tracking-[1px]">
                  Engage in AI storytelling, play with your friends or create your own stories.
                </p>
              </div>
              <Button
                onClick={() => googleLogin()}
                className="w-full rounded-b-md rounded-t-none border-none py-3 pl-32 pr-4 focus:ring-0 focus:ring-offset-0"
              >
                Log in with google
              </Button>
              <Image
                src="/images/login-mage1.png"
                alt="mage 1"
                width={138}
                height={188}
                className="absolute -left-4 bottom-[-1px]"
              />
            </div>
            <div className="relative flex w-full flex-col rounded-md border border-white/10 bg-black">
              <div className="flex w-full flex-col gap-3 p-4 pl-[108px]">
                <p className="font-semibold uppercase leading-none tracking-[2.2px]">
                  Compete & earn
                </p>
                <p className="min-h-[32px] text-sm font-light leading-[112%] tracking-[1px]">
                  Join competitions, reach the top of leaderboard and earn rewards.
                </p>
              </div>
              <SolanaLogin />
              <Image
                src="/images/login-mage2.png"
                alt="mage 1"
                width={148}
                height={172}
                className="absolute -left-4 bottom-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full w-full lg:flex">
        <div className="relative flex h-full w-1/2 shrink-0 grow-0">
          <div className="absolute inset-0 z-[-5] flex h-full w-full bg-gradient-to-b from-black via-black/10 via-35% to-black" />
          <div className={`absolute inset-0 -z-10 h-full w-full`}>
            <div
              className="flex h-full w-[300%] overflow-hidden transition duration-300 ease-out"
              style={{
                transform: `translateX(-${(100 * current) / 3}%)`,
              }}
            >
              {slides.map((slide) => (
                <div key={slide.image} className="flex h-full w-1/3">
                  <Image
                    src={slide.image}
                    alt={slide.description}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                    quality={100}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 flex w-full flex-col items-center gap-6 bg-gradient-to-t from-black via-black/60 via-80% to-transparent pb-10 lg:via-black/40">
            <div className="relative h-80 w-full lg:mb-12 lg:pb-24">
              {slides.map((slide, i) => (
                <div
                  key={slide.image}
                  className={cn(
                    "absolute bottom-0 flex w-full flex-col items-center gap-4 px-4 opacity-0 blur-xl transition-all duration-500 ease-out",
                    current === i && "opacity-100 blur-none",
                  )}
                >
                  <p className="text-center text-2xl font-light tracking-widest lg:text-5xl lg:tracking-[6.72px]">
                    {slide.headerStart} <br />
                    <span className="text-center font-bold lg:whitespace-nowrap">
                      {slide.headerEnd}
                    </span>
                  </p>
                  <p className="text-center text-sm tracking-widest lg:w-[550px] lg:text-xl">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-3 lg:hidden">
              <Button
                variant="google"
                className="w-fit gap-2 px-6 py-5"
                onClick={() => googleLogin()}
              >
                <FaGoogle />
                LOG IN WITH GOOGLE
              </Button>

              <div className="flex items-center">
                <div className="h-1 w-20 rounded-md bg-white/25"></div>
                <span className="px-5">OR</span>
                <div className="h-1 w-20 rounded-md bg-white/25"></div>
              </div>

              <SolanaLogin />
            </div>
            <div className="flex gap-3">
              {slides.map((_, i) => {
                return (
                  <button
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    key={"Slide" + i}
                    className={cn(
                      "h-1.5 w-20 rounded-md bg-white/25 transition-all duration-200 hover:bg-white/60 active:bg-white/90",
                      i === current && "bg-primary hover:bg-primary active:bg-primary",
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative flex h-full w-1/2 shrink-0 grow-0 flex-col items-center justify-center gap-14 bg-dark-900">
          <div className="flex w-[580px] gap-9">
            <Game className="h-[75px] w-[75px] shrink-0 opacity-30" />

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-4xl font-semibold uppercase">Casual play</p>
                <p className=" text-xl tracking-[1.5px]">
                  Engage in AI storytelling, play with your friends or create your own stories.
                </p>
              </div>
              <Button
                variant="google"
                className="w-full items-center gap-2.5 px-6 py-5"
                onClick={() => googleLogin()}
              >
                <FaGoogle />
                LOG IN WITH GOOGLE
              </Button>
            </div>
          </div>

          <div className="mt-4 h-0.5 w-full bg-black shadow-lobby" />
          <div className="flex w-[580px] gap-9">
            <Game className="h-[75px] w-[75px] shrink-0 opacity-30" />

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-4xl font-semibold uppercase">Compete & earn</p>
                <p className=" text-xl tracking-[1.5px]">
                  Join competitions, reach the top of the leaderboard and earn rewards.
                </p>
              </div>
              <SolanaLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
