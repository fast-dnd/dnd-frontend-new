"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenNib, Star } from "@phosphor-icons/react";
import { BiChevronLeft } from "react-icons/bi";
import { FaDice, FaDiscord } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { toast } from "sonner";

import useAuth from "@/hooks/helpers/use-auth";
import { logout } from "@/utils/auth";
import { cn } from "@/utils/style-utils";

import DiamondDMCurrencyIcon from "../icons/diamond-dm-currency-icon";
import GoldCoinIcon from "../icons/gold-coin-icon";
import QuillIcon from "../icons/quill-icon";
import SwordsIcon from "../icons/swords-icon";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface IMobileNavbarProps {
  className?: string;
  onClickBack?: () => void;
}

const MobileNavbar = ({ className, onClickBack }: IMobileNavbarProps) => {
  const { user } = useAuth();
  const pathname = usePathname();

  const onSignOut = () => {
    logout();
    toast.success("Signed out successfully!");
  };

  const ratings = [
    {
      icon: <FaDice size={16} className="fill-white/50" />,
      rank: user?.ranking.gameplay.rating,
    },
    {
      icon: <Star size={16} weight="fill" className="fill-white/50" />,
      rank: user?.ranking.influencer.rating,
    },
    {
      icon: <PenNib size={16} weight="fill" className="fill-white/50" />,
      rank: user?.ranking.contentCreation.rating,
    },
  ];

  return (
    <div
      className={cn(
        "pointer-events-none flex h-16 w-full items-start justify-between bg-gradient-to-b from-black via-black/60 via-60% to-transparent px-4 pt-3 lg:hidden",
        className,
      )}
    >
      {onClickBack && (
        <BiChevronLeft
          className="pointer-events-auto absolute left-4 top-4 h-6 w-auto"
          onClick={onClickBack}
        />
      )}
      <div />
      <Link href="/home" className="pointer-events-auto translate-x-1/4">
        <Image src="/images/navbar-logo.png" width={94} height={32} alt="logo" />
      </Link>
      <Sheet>
        <SheetTrigger className="pointer-events-auto">
          <IoMdMenu className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent
          className={cn(
            "pointer-events-auto z-[100] flex flex-col justify-between gap-8 bg-primary-900/60 backdrop-blur-xl",
          )}
        >
          <Link href="/home" className="w-fit">
            <Image src="/images/navbar-logo.png" width={94} height={32} alt="logo" />
          </Link>

          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <Button
                  className="gap-2 py-4"
                  href="/home"
                  variant={pathname === "/home" ? "primary" : "sidebar"}
                >
                  <SwordsIcon className="fill-white" />
                  PLAY
                </Button>
                <Button
                  variant={pathname === "/profile" ? "primary" : "sidebar"}
                  className="gap-2 whitespace-nowrap py-4"
                  href="/profile?activeTab=GAME HISTORY"
                >
                  <QuillIcon className="h-4 w-4 shrink-0 fill-white" fillOpacity={1} />
                  GAME HISTORY
                </Button>
              </>
            ) : (
              <Button
                className="py-4"
                href="/guide"
                variant={pathname === "/guide" ? "primary" : "sidebar"}
              >
                HOW TO PLAY
              </Button>
            )}

            <Button
              variant="sidebar"
              className="gap-2 py-4"
              href="https://discord.com/invite/36chp8DnzC"
              target="_blank"
            >
              <FaDiscord className="h-6 w-6" />
              JOIN US
            </Button>
          </div>
          {user ? (
            <div className="-mx-4 -mb-6 flex w-[calc(100%_+_3rem)] flex-col items-center bg-primary-900">
              <Link href="/profile" className="-translate-y-1/2">
                <Image
                  src={user?.account.imageUrl || "/images/default-avatar.png"}
                  width={76}
                  height={76}
                  alt="avatar"
                  className="rounded-full border-4 border-primary-900"
                />
              </Link>
              <div className="-mt-14 mb-4 flex gap-4">
                {ratings.map(({ icon, rank }, index) => (
                  <div
                    key={index}
                    className="relative flex h-9 w-9 flex-col items-center justify-center rounded-full bg-[#232322]"
                  >
                    {icon}
                    <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-medium text-white/50">
                      {rank}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                className={cn(
                  "mr-4 w-full text-center font-bold",
                  pathname === "/leaderboard" && "text-primary",
                )}
                href="/leaderboard"
              >
                SEE THE LEADERBOARD
              </Link>

              <div className="my-3 h-0.5 w-full bg-black shadow-lobby" />

              <div className="mr-4 flex gap-2">
                <div className="flex items-center justify-center gap-1 rounded-md bg-white/5 px-6 py-1">
                  <GoldCoinIcon />
                  {user?.account.coins ?? "-"}
                </div>
                <div className="flex items-center justify-center gap-1 rounded-md bg-white/5 px-6 py-1">
                  <DiamondDMCurrencyIcon image />
                  {user?.account.dmCurrency ?? "-"}
                </div>
              </div>

              <button className="my-5 text-center font-bold" onClick={onSignOut}>
                SIGN OUT
              </button>
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
