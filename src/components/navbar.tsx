"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDiscord } from "react-icons/fa";

import useGetAccount from "@/hooks/use-get-account";
import useCheckJWT from "@/utils/check-jwt";
import { cn } from "@/utils/style-utils";

import Coin from "./coin";

const Navbar = () => {
  const tokenExists = useCheckJWT();
  const pathname = usePathname();

  const { data: account } = useGetAccount(!tokenExists);

  const loggedIn = tokenExists && account;

  return (
    <div className="hidden w-full items-center justify-between gap-12 pl-2 pr-8 lg:flex">
      <Link href="/home">
        <Image src="/images/logo.png" width={300} height={100} alt="logo" />
      </Link>
      <div className="flex items-center gap-6 text-2xl leading-7 tracking-[3.3px]">
        <Link
          href={loggedIn ? "/home" : "/login"}
          className={cn(
            "border-b-4 border-transparent transition-all duration-300 hover:border-primary-500/50",
            pathname === "/home" && "border-primary-500",
          )}
        >
          {loggedIn ? "PLAY" : "LOG IN"}
        </Link>
        <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
        <Link
          href="/guide"
          className={cn(
            "border-b-4 border-transparent transition-all duration-300 hover:border-primary-500/50",
            pathname === "/guide" && "border-primary-500",
          )}
        >
          HOW TO PLAY
        </Link>
        {loggedIn && (
          <>
            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
            <Link
              href="/create-adventure"
              className={cn(
                "border-b-4 border-transparent transition-all duration-300 hover:border-primary-500/50",
                pathname === "/create-adventure" && "border-primary-500",
              )}
            >
              CREATE ADVENTURE
            </Link>
            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />

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

            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />

            <div className="flex gap-6 rounded-md bg-white/10 px-2 py-1.5 backdrop-blur-sm transition-all duration-300 hover:opacity-80">
              <Link href="/profile" className="flex items-center gap-2 tracking-[4px]">
                <Image
                  src={account?.account.imageUrl || "/images/default-avatar.png"}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="h-full w-full rounded-md transition-all duration-300"
                />
                PROFILE
              </Link>
            </div>
          </>
        )}
        <div className="flex gap-6 rounded-md bg-white/10 px-2 py-1.5 backdrop-blur-sm transition-all duration-300 hover:opacity-80">
          <Link
            href="https://discord.gg/ThZyScUt"
            className="flex items-center gap-2 tracking-[4px]"
          >
            <FaDiscord />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
