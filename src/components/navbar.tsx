"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDiscord } from "react-icons/fa";

import useAuth from "@/hooks/helpers/use-auth";
import { cn } from "@/utils/style-utils";

import ClaimRewardModal from "./claim-reward-modal";
import DiamondDMCurrencyIcon from "./icons/diamond-dm-currency-icon";
import GoldCoinIcon from "./icons/gold-coin-icon";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Navbar = () => {
  const pathname = usePathname();

  const { user, loggedIn } = useAuth();

  return (
    <div className="hidden w-full items-center justify-between gap-12 py-10 lg:flex">
      <div className="flex items-center gap-12">
        <Link href="/home">
          <Image src="/images/navbar-logo.png" width={203} height={70} alt="logo" />
        </Link>
        {loggedIn && <ClaimRewardModal />}
      </div>
      <div className="flex items-center gap-6 text-2xl leading-7 tracking-[3.3px]">
        <Link
          href={loggedIn ? "/home" : "/login"}
          className={cn(
            "border-b-4 border-transparent transition-all duration-300 hover:border-primary/50",
            loggedIn && pathname === "/home" && "border-primary",
            !loggedIn && pathname === "/login" && "border-primary",
          )}
        >
          {loggedIn ? "PLAY" : "LOG IN"}
        </Link>
        {loggedIn && (
          <>
            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
            <Link
              href="/create-adventure"
              className={cn(
                "border-b-4 border-transparent transition-all duration-300 hover:border-primary/50",
                pathname === "/create-adventure" && "border-primary",
              )}
            >
              CREATE ADVENTURE
            </Link>

            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
            <Link
              href="/leaderboard"
              className={cn(
                "border-b-4 border-transparent transition-all duration-300 hover:border-primary/50",
                pathname === "/leaderboard" && "border-primary",
              )}
            >
              LEADERBOARD
            </Link>
          </>
        )}
        <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
        <Link
          href="/guide"
          className={cn(
            "border-b-4 border-transparent transition-all duration-300 hover:border-primary/50",
            pathname === "/guide" && "border-primary",
          )}
        >
          GUIDE
        </Link>
        {loggedIn && (
          <>
            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />

            <div className="flex gap-6 rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex cursor-default items-center gap-2">
                      <GoldCoinIcon />
                      {user?.account.coins ?? "-"}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="border-transparent tracking-widest">
                    Coins used for creating games
                    <TooltipArrow className=" fill-select text-select" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex cursor-default items-center gap-2">
                      <DiamondDMCurrencyIcon />
                      {user?.account.dmCurrency ?? "-"}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="border-transparent tracking-widest">
                    DM coins, comming soon!
                    <TooltipArrow className=" fill-select text-select" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />

            <div className="flex gap-6 rounded-md bg-white/10 px-2 py-1.5 backdrop-blur-sm transition-all duration-300 hover:opacity-80">
              <Link href="/profile" className="flex items-center gap-2 tracking-[4px]">
                <Image
                  src={user?.account.imageUrl || "/images/default-avatar.png"}
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
            href="https://discord.com/invite/36chp8DnzC"
            className="flex items-center"
            aria-label="Discord"
            target="_blank"
          >
            <FaDiscord className="h-11 w-11" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
