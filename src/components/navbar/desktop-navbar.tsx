"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useAuth from "@/hooks/helpers/use-auth";
import { cn } from "@/utils/style-utils";

import ClaimRewardModal from "../claim-reward-modal";
import RewardPool from "./components/reward-pool";
import ProfileDropdown from "./profile-dropdown";

const DesktopNavbar = () => {
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
            "border-b-4 border-transparent pb-2 transition-all duration-300 hover:border-primary/50",
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
                "border-b-4 border-transparent pb-2 transition-all duration-300 hover:border-primary/50",
                pathname === "/create-adventure" && "border-primary",
              )}
            >
              CREATE ADVENTURE
            </Link>
            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
            <Link
              href="/leaderboard"
              className={cn(
                "border-b-4 border-transparent pb-2 transition-all duration-300 hover:border-primary/50",
                pathname === "/leaderboard" && "border-primary",
              )}
            >
              LEADERBOARD
            </Link>
            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
            <RewardPool /> {/* TODO: display only if web3  */}
            <ProfileDropdown />
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopNavbar;
