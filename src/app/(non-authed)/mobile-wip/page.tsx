import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

const MobileWIP = () => {
  return (
    <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-between overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-[-5] h-full w-full bg-gradient-to-b from-black via-black/10 via-35% to-black">
        <Image
          src={"/images/bg-mobile-wip.png"}
          alt={""}
          priority
          fill
          className="object-cover"
          quality={100}
        />
      </div>
      <div className="flex h-[90%] w-full flex-col items-center justify-between p-9">
        <Image src="/images/navbar-logo.png" width={203} height={70} alt="logo" />
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="w-80 text-center text-xl font-bold uppercase leading-[24.80px] tracking-[2.80px] text-white">
              v3rpg is currently only available on desktop
            </div>
            <div className="w-80 text-center text-sm font-light tracking-wide text-white">
              We&apos;re working hard to bring the game to mobile. In the meantime switch to your
              desktop to experience the best AI based storytelling gaming experience.
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="https://landing.v3rpg.com"
              className="flex w-fit items-center justify-center gap-2.5 rounded border-2 border-neutral-500 bg-zinc-800 px-3 py-1 text-xs font-medium uppercase tracking-wide"
            >
              <AiOutlineLeft className="inline" /> back to landing page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWIP;
