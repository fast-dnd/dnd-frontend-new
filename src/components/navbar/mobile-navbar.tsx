"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";
import { FaDiscord, FaUsers } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { PiTrophyFill } from "react-icons/pi";

import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";
import useGetWeb3Balance from "@/hooks/helpers/use-get-web3-balance";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { cn } from "@/utils/style-utils";

import QuillIcon from "../icons/quill-icon";
import SwordsIcon from "../icons/swords-icon";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import MobileProfile from "./components/mobile-profile";
import ShopModal from "./components/shop-modal";

interface IMobileNavbarProps {
  className?: string;
  onClickBack?: () => void;
}

const MobileNavbar = ({ className, onClickBack }: IMobileNavbarProps) => {
  const { isDefault, communityId } = useCommunity();
  const { data: currentCommunity } = useGetCurrentCommunity();
  const [shopOpen, setShopOpen] = useState(false);

  const rewardPoolBalance = useGetWeb3Balance({
    accountAddress: currentCommunity?.rewardPool ?? "",
    mintAddress: currentCommunity?.gameCurrency ?? "",
  });

  const { user } = useAuth();

  const pathname = usePathname();

  return (
    <div
      className={cn(
        "pointer-events-none z-[55] flex h-16 w-full items-start justify-between bg-gradient-to-b from-black via-black/60 via-60% to-transparent px-4 pt-3 lg:hidden",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <BiChevronLeft
          className={cn(
            "pointer-events-auto mb-1 h-6 w-auto",
            !onClickBack && !shopOpen && "hidden",
          )}
          onClick={shopOpen ? () => setShopOpen(false) : onClickBack}
        />

        <Link href="/home" className="pointer-events-auto">
          <Image src="/images/navbar-logo.png" width={94} height={32} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <MobileProfile setShopOpen={setShopOpen} />
        <ShopModal open={shopOpen} setOpen={setShopOpen} />
        <Sheet>
          <SheetTrigger className="pointer-events-auto">
            <IoMdMenu className="h-8 w-8" />
          </SheetTrigger>
          <SheetContent
            className={cn(
              "pointer-events-auto z-[100] flex flex-col gap-8 bg-primary-900/60 p-0 backdrop-blur-xl",
            )}
          >
            <div className="flex flex-1 flex-col gap-8 p-4 pb-0">
              <Link href="/home" className="w-fit">
                <Image src="/images/navbar-logo.png" width={94} height={32} alt="logo" />
              </Link>
              <div className="flex flex-1 flex-col justify-center gap-4">
                {user ? (
                  <>
                    {!isDefault && (
                      <Button
                        className="gap-2 py-4"
                        href="/communities"
                        variant={pathname === "/communities" ? "primary" : "sidebar"}
                      >
                        <FaUsers className="h-5 w-5 shrink-0 fill-white" />
                        <p className="flex-1 text-center">Communities</p>
                      </Button>
                    )}

                    <Button
                      className="gap-4 py-4"
                      href="/home"
                      variant={pathname === "/home" ? "primary" : "sidebar"}
                      disabled={!communityId}
                    >
                      <SwordsIcon className="h-5 w-5 shrink-0 fill-white" />
                      <p className="flex-1 text-center">play</p>
                    </Button>
                    <Button
                      className="gap-4 py-4"
                      href="/leaderboard"
                      variant={pathname === "/leaderboard" ? "primary" : "sidebar"}
                      disabled={!communityId}
                    >
                      <PiTrophyFill className="h-5 w-5 shrink-0" />
                      <p className="flex-1 text-center">Leaderboard</p>
                    </Button>
                    <Button
                      variant={pathname === "/profile" ? "primary" : "sidebar"}
                      className="gap-4 whitespace-nowrap py-4"
                      href="/profile?activeTab=GAME HISTORY"
                      disabled={!communityId}
                    >
                      <QuillIcon className="h-5 w-5 shrink-0 fill-white" fillOpacity={1} />
                      <p className="flex-1 text-center">GAME HISTORY</p>
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
                  className="gap-4 py-4"
                  href="https://discord.com/invite/36chp8DnzC"
                  target="_blank"
                >
                  <FaDiscord className="h-5 w-5 shrink-0" />
                  <p className="flex-1 text-center">JOIN US</p>
                </Button>
              </div>
            </div>

            {!!currentCommunity && (
              <div className="flex w-full items-center gap-2 border-t border-white/20 bg-rewardGradient px-4 py-2">
                <Image
                  src={currentCommunity?.rewardPoolImgUrl ?? ""}
                  width={34}
                  height={34}
                  alt={currentCommunity?.name + " reward pool image"}
                  className=" rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm leading-none tracking-[1.05px]">Reward Pool</p>
                  <p className="text-sm font-bold leading-none tracking-[1px]">
                    {rewardPoolBalance} {currentCommunity?.currencyName}
                  </p>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNavbar;
