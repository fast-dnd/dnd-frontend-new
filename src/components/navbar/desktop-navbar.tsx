"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";

import useAuth from "@/hooks/helpers/use-auth";
import { cn } from "@/utils/style-utils";

import ClaimRewardModal from "../claim-reward-modal";
import ProfileDropdown from "./components/profile-dropdown";
import RewardPool from "./components/reward-pool";

const DesktopNavbar = () => {
  const communityId = useReadLocalStorage<string>("communityId");
  const defaultCommunityId = useReadLocalStorage<string>("defaultCommunityId");
  const isDefault = Boolean(
    defaultCommunityId && communityId && defaultCommunityId === communityId,
  );

  const pathname = usePathname();

  const { loggedIn } = useAuth();

  return (
    <div className="z-10 hidden w-full items-center justify-between gap-12 py-10 lg:flex">
      <div className="flex items-center gap-12">
        <Link href="/home">
          <Image src="/images/navbar-logo.png" width={203} height={70} alt="logo" />
        </Link>
        {loggedIn && communityId && <ClaimRewardModal />}
      </div>
      <div className="flex items-center gap-6 text-2xl leading-7 tracking-[3.3px]">
        {!isDefault && communityId && (
          <>
            <Link
              href="/communities"
              className={cn(
                "border-b-4 border-transparent pb-2 transition-all duration-300 hover:border-primary/50",
                pathname === "/communities" && "border-primary",
              )}
            >
              COMMUNITIES
            </Link>
            <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
          </>
        )}
        {communityId && (
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
        )}
        {loggedIn && (
          <>
            {communityId && (
              <>
                <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
                <Link
                  href="/create-adventure"
                  className={cn(
                    "border-b-4 border-transparent pb-2 transition-all duration-300 hover:border-primary/50",
                    pathname === "/create-adventure" && "border-primary",
                    !communityId && "hidden",
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
                    !communityId && "hidden",
                  )}
                >
                  LEADERBOARD
                </Link>
                <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
                <RewardPool /> {/* TODO: display only if web3  */}
              </>
            )}
            <ProfileDropdown />
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopNavbar;
