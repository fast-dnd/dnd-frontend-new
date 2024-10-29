"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordLogo, InstagramLogo, TwitterLogo } from "@phosphor-icons/react";

import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";
import { cn } from "@/utils/style-utils";

import ClaimRewardModal from "../common/claim-reward-modal";
import MusicSettingsModal from "../common/music-settings-modal";
import ProfileDropdown from "./components/profile-dropdown";
import RewardPool from "./components/reward-pool";

const DesktopNavbar = () => {
  const { isDefault, communityId } = useCommunity();

  const pathname = usePathname();

  const { loggedIn } = useAuth();

  return (
    <div className="z-10 hidden w-full items-center justify-between gap-12 py-10 lg:flex">
      <div className="flex items-center gap-12">
        <Link href="/home">
          <Image src="/images/navbar-logo.png" width={203} height={70} alt="logo" />
        </Link>
        <Link
          href="https://discord.com/invite/36chp8DnzC"
          className="flex items-center gap-2 hover:opacity-70"
          target="_blank"
        >
          <DiscordLogo className="size-7" />
        </Link>
        <Link
          href="https://www.instagram.com/game.v3rpg/"
          className="flex items-center gap-2 hover:opacity-70"
          target="_blank"
        >
          <InstagramLogo className="size-7" />
        </Link>
        <Link
          href="https://twitter.com/v3rpg"
          className="flex items-center gap-2 hover:opacity-70"
          target="_blank"
        >
          <TwitterLogo className="size-7" />
        </Link>
        <MusicSettingsModal></MusicSettingsModal>
      </div>
      <div className="flex items-center gap-6 text-2xl leading-7 tracking-[3.3px]">
        {loggedIn && !isDefault && !!communityId && (
          <>
            <Link
              href="/communities"
              className={cn(
                "mt-1 border-b-4 border-transparent pb-1 transition-all duration-300 hover:border-primary/50",
                pathname === "/communities" && "border-primary",
              )}
            >
              COMMUNITIES
            </Link>
            <div className="size-2 rotate-45 bg-white opacity-25" />
          </>
        )}
        {loggedIn && (
          <>
            {!!communityId && (
              <>
                <Link
                  href={loggedIn ? "/home" : "/login"}
                  className={cn(
                    "mt-1 border-b-4 border-transparent pb-1 transition-all duration-300 hover:border-primary/50",
                    loggedIn && pathname === "/home" && "border-primary",
                    !loggedIn && pathname === "/login" && "border-primary",
                  )}
                >
                  {loggedIn ? "PLAY" : "LOG IN"}
                </Link>
                <div className="size-2 rotate-45 bg-white opacity-25" />
                <div className="relative inline-block">
                  <Link
                    href="/community-battles"
                    className={cn(
                      "mt-1 inline-block border-b-4 border-transparent pb-1 transition-all duration-300 hover:border-primary/50",
                      pathname === "/community-battles" && "border-primary",
                      !communityId && "hidden",
                    )}
                  >
                    COMMUNITY BATTLES
                  </Link>
                  <span className="py-0.2 text-red absolute -top-7 right-6  translate-x-1/2 rounded-md px-1.5 text-[10px] font-bold text-red-600">
                    {" "}
                    BETA
                  </span>
                </div>
                <div className="size-2 rotate-45 bg-white opacity-25" />
                <div className="relative inline-block">
                  <Link
                    href="/ai-box/daily"
                    className={cn(
                      "mt-1 border-b-4 border-transparent pb-1 transition-all duration-300 hover:border-primary/50",
                      pathname === "/ai-box/daily" && "border-primary",
                      !communityId && "hidden",
                    )}
                  >
                    AI BOX
                  </Link>
                  <span className="py-0.2 rounded-mdpx-1.5 absolute -top-7 right-6 translate-x-1/2  text-[10px] font-bold text-red-600">
                    BETA
                  </span>
                </div>

                <div className="size-2 rotate-45 bg-white opacity-25" />
                <Link
                  href="/leaderboard"
                  className={cn(
                    "mt-1 border-b-4 border-transparent pb-1 transition-all duration-300 hover:border-primary/50",
                    pathname === "/leaderboard" && "border-primary",
                    !communityId && "hidden",
                  )}
                >
                  HEROIC RANKINGS
                </Link>
                {!isDefault && (
                  <>
                    <div className="size-2 rotate-45 bg-white opacity-25" />
                    <RewardPool />
                  </>
                )}
              </>
            )}
            <ProfileDropdown />
            {loggedIn && !!communityId && <ClaimRewardModal />}
          </>
        )}
      </div>
      {!loggedIn && (
        <Link
          href="https://discord.com/invite/36chp8DnzC"
          className="flex items-center gap-2 hover:opacity-70"
          target="_blank"
        >
          <DiscordLogo className="size-7" />
          Join our Discord
        </Link>
      )}
    </div>
  );
};

export default DesktopNavbar;
