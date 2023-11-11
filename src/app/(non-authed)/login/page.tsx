"use client";

import { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { useGoogleLogin } from "@react-oauth/google";
import { useWallet } from "@solana/wallet-adapter-react";
import { FcGoogle } from "react-icons/fc";

import MobileNavbar from "@/components/mobile-navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import useLogin from "./hooks/use-login";
import useSlides from "./hooks/use-slides";
import useSolanaLogin from "./hooks/use-solana-login";
import { slides } from "./utils/slides";

const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

const Login = () => {
  const [current, setCurrent] = useSlides();
  const { signMessage, wallet, publicKey } = useWallet();
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
      console.log(error);
    }
  }, [solanaLogin, publicKey, signMessage, wallet]);

  useEffect(() => {
    if (publicKey) handleSignMessage();
  }, [handleSignMessage, publicKey]);

  return (
    <div className="fixed inset-0 flex h-full items-end justify-center max-lg:px-4">
      <div className="absolute top-0 w-full">
        <MobileNavbar />
      </div>
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
      <div className="absolute bottom-10 flex flex-col items-center gap-6 lg:bottom-0 lg:gap-16 lg:pb-24">
        <div className="relative w-full bg-red-500">
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className={cn(
                "absolute bottom-0 flex w-full flex-col items-center gap-4 opacity-0 blur-xl transition-all duration-500 ease-out",
                current === i && "opacity-100 blur-none",
              )}
            >
              <p className="text-center text-2xl font-light tracking-widest max-lg:w-[328px] lg:text-5xl lg:tracking-[6.72px]">
                {slide.headerStart} <br />
                <span className="text-center font-bold lg:whitespace-nowrap">
                  {slide.headerEnd}
                </span>
              </p>
              <p className="w-[270px] text-center text-sm tracking-widest lg:w-[550px] lg:text-xl">
                {slide.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center gap-6 lg:mt-12">
          <Button variant="google" className="w-fit gap-2 px-6 py-5" onClick={() => googleLogin()}>
            <FcGoogle />
            LOG IN WITH GOOGLE
          </Button>

          <div className="flex items-center">
            <div className="h-1 w-20 rounded-md bg-white/25"></div>
            <span className="px-5">OR</span>
            <div className="h-1 w-20 rounded-md bg-white/25"></div>
          </div>

          <div className="flex w-full items-center rounded-md border-2 border-white bg-black px-6 py-2 transition-all duration-300 hover:bg-white/10 active:bg-white/25">
            <WalletMultiButtonDynamic />
          </div>
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
  );
};

export default Login;
