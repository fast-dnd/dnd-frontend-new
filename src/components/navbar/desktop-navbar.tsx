"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordLogo, InstagramLogo, TwitterLogo } from "@phosphor-icons/react";

import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";
import { cn } from "@/utils/style-utils";

import {
  dungeonFormStore,
  getInitialDungeonFormData,
} from "@/app/(authed)/create-adventure/[[...dungeonId]]/stores/dungeon-form-store";

import ClaimRewardModal from "../common/claim-reward-modal";
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
                <Link
                  href="/create-adventure"
                  onClick={() => {
                    if (
                      pathname !== "/create-adventure" &&
                      dungeonFormStore.dungeonFormData._id.get()
                    )
                      dungeonFormStore.dungeonFormData.set(getInitialDungeonFormData());
                  }}
                  className={cn(
                    "mt-1 border-b-4 border-transparent pb-1 transition-all duration-300 hover:border-primary/50",
                    pathname === "/create-adventure" && "border-primary",
                    !communityId && "hidden",
                  )}
                >
                  CREATE ADVENTURE
                </Link>
                <div className="size-2 rotate-45 bg-white opacity-25" />
                <Link
                  href="/leaderboard"
                  className={cn(
                    "mt-1 border-b-4 border-transparent pb-1 transition-all duration-300 hover:border-primary/50",
                    pathname === "/leaderboard" && "border-primary",
                    !communityId && "hidden",
                  )}
                >
                  LEADERBOARD
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
          Join us on Discord
        </Link>
      )}
    </div>
  );
};

export default DesktopNavbar;
