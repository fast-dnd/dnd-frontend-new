"use client";

import Image from "next/image";
import Link from "next/link";

import checkJWT from "@/utils/check-jwt";
import useGetAccount from "@/hooks/use-get-account";

import Coin from "./coin";

const Navbar = ({ authed = true }: { authed?: boolean }) => {
  const loggedIn = authed || checkJWT();

  const { data: account } = useGetAccount(!loggedIn);

  return (
    <div className="hidden w-full items-center justify-between gap-12 pl-2 pr-8 lg:flex">
      <Image src="/images/logo.png" width={300} height={100} alt="logo" />
      <div className="flex items-center gap-6 text-2xl leading-7 tracking-[3.3px]">
        <Link href={account ? "/home" : "/login"}>{account ? "PLAY" : "LOG IN"}</Link>
        <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
        <Link href="/guide">HOW TO PLAY</Link>
        <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
        {!!account && (
          <>
            <Link href="/profile">
              <Image
                src={account?.account.imageUrl || "/images/default-avatar.png"}
                width={60}
                height={60}
                alt="avatar"
                className="rounded-md"
              />
            </Link>

            <div className="flex gap-6 rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <Coin silver />
                {account?.account.coins ?? "-"}
              </div>
              <div className="flex items-center gap-1">
                <Coin />

                {account?.account.dmCurrency ?? "-"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
