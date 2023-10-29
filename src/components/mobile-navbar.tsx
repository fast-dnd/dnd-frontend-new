"use client";

import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

import useAuth from "@/hooks/helpers/use-auth";
import { cn } from "@/utils/style-utils";

import Coin from "./coin";
import QuillIcon from "./icons/quill-icon";
import SwordsIcon from "./icons/swords-icon";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface IMobileNavbarProps {
  className?: string;
  onClickBack?: () => void;
}

const MobileNavbar = ({ className, onClickBack }: IMobileNavbarProps) => {
  const { user } = useAuth();

  return (
    <div className={cn("flex w-full items-center justify-between px-4 pt-3 lg:hidden", className)}>
      {onClickBack && (
        <BiChevronLeft className="absolute left-4 top-4 h-6 w-auto" onClick={onClickBack} />
      )}
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
  );
};

export default MobileNavbar;
