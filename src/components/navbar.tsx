"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDiscord } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

import useAuth from "@/hooks/helpers/use-auth";
import { cn } from "@/utils/style-utils";

import ClaimRewardModal from "./claim-reward-modal";
import Coin from "./coin";
import QuillIcon from "./icons/quill-icon";
import SwordsIcon from "./icons/swords-icon";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
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
    <>
      {/* DESKTOP NAVBAR */}
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
                      <div className="flex cursor-default items-center gap-1">
                        <Coin silver />
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
                      <div className="flex cursor-default items-center gap-1">
                        <Coin />
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
            >
              <FaDiscord className="h-11 w-11" />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="flex w-full items-center justify-between pt-3 lg:hidden">
        <div />
        <Link href="/home" className="translate-x-1/4">
          <Image src="/images/navbar-logo.png" width={94} height={32} alt="logo" />
        </Link>
        <Sheet>
          <SheetTrigger>
            <IoMdMenu className="h-8 w-8" />
          </SheetTrigger>
          <SheetContent
            className={cn("flex flex-col justify-between gap-8", user && "bg-primary-900/60")}
          >
            <Link href="/home">
              <Image src="/images/navbar-logo.png" width={94} height={32} alt="logo" />
            </Link>

            <div className="flex flex-col gap-4">
              {user ? (
                <>
                  <Button className="gap-2 py-4" href="/home">
                    <SwordsIcon className="fill-white" />
                    PLAY
                  </Button>
                  <Button
                    variant="sidebar"
                    className="gap-2 whitespace-nowrap py-4"
                    href="/profile?activeTab=GAME HISTORY"
                  >
                    <QuillIcon className="h-4 w-4 shrink-0 fill-white" fillOpacity={1} />
                    GAME HISTORY
                  </Button>
                </>
              ) : (
                <Button variant="sidebar" className="py-4" href="/guide">
                  HOW TO PLAY
                </Button>
              )}

              <Button
                variant="sidebar"
                className="gap-2 py-4"
                href="https://discord.com/invite/36chp8DnzC"
              >
                <FaDiscord className="h-6 w-6" />
                JOIN US
              </Button>
            </div>
            {user ? (
              <div className="-mx-6 -mb-6 flex w-[calc(100%_+_3rem)] flex-col items-center bg-primary-900">
                <Link href="/profile">
                  <Image
                    src={user?.account.imageUrl || "/images/default-avatar.png"}
                    width={76}
                    height={76}
                    alt="avatar"
                    className="-translate-y-1/2 rounded-full"
                  />
                </Link>
                <div className="flex gap-4">
                  <div className="flex h-10 w-24 items-center justify-center gap-1 rounded-md bg-white/5">
                    <Coin silver />
                    {user?.account.coins ?? "-"}
                  </div>
                  <div className="flex h-10 w-24 items-center justify-center gap-1 rounded-md bg-white/5">
                    <Coin />
                    {user?.account.dmCurrency ?? "-"}
                  </div>
                </div>

                <div className="my-5 text-center">SIGN OUT</div>
              </div>
            ) : (
              <div />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navbar;
