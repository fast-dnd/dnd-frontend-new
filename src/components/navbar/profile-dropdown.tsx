import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpenText, DiscordLogo, Plugs, UserCircle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";

import useAuth from "@/hooks/helpers/use-auth";
import { logout } from "@/utils/auth";
import { cn } from "@/utils/style-utils";

import DiamondDMCurrencyIcon from "../icons/diamond-dm-currency-icon";
import GoldCoinIcon from "../icons/gold-coin-icon";

const ProfileDropdown = () => {
  const { user } = useAuth();

  const buttonRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  useOnClickOutside(buttonRef, () => setOpenDropdown(false));

  const onSignOut = () => {
    logout();
    toast.success("Signed out successfully!");
  };

  return (
    <div className="relative flex flex-col" ref={buttonRef}>
      <button
        className={cn(
          "z-20 flex w-72 cursor-pointer items-center justify-between gap-2 rounded-full border-2 border-white/20 bg-black p-2 transition-all duration-200 hover:border-2 hover:bg-neutral-800 hover:shadow-sm hover:shadow-white/20 active:opacity-90",
          openDropdown && "border-b-0",
        )}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <Image
          src={user?.account.imageUrl || "/images/default-avatar.png"}
          width={45}
          height={45}
          alt="avatar"
          className="h-fit w-fit rounded-full bg-white"
        />
        <p className="font-medium">{user?.account.username ?? "-----------"}</p>
        <BiChevronDown className="h-auto w-8" />
      </button>
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: openDropdown ? "auto" : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "absolute top-0 z-10 w-full rounded-b-lg rounded-t-[40px] bg-black shadow-sm shadow-white/20",
        )}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: openDropdown ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-14 flex flex-col gap-4 p-4 text-base tracking-[1.2px]"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-primary-900 px-1.5 py-2.5">
              <GoldCoinIcon className="h-5 w-5" />
              <p className="font-bold">{user?.account.coins}</p>
              <Link href="/shop" className="rounded-lg bg-white/10 px-2 py-1">
                +
              </Link>
            </div>
            <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-primary-900 px-1.5 py-2.5">
              <DiamondDMCurrencyIcon className="h-5 w-5" />
              <p className="font-bold">{user?.account.dmCurrency}</p>
              <Link href="/shop" className="rounded-lg bg-white/10 px-2 py-1">
                +
              </Link>
            </div>
          </div>

          <div className="h-1 w-full bg-white/10" />

          <Link href="/profile" className="flex items-center gap-2">
            <UserCircle className="h-7 w-7" />
            View Profile
          </Link>

          <button className="flex items-center gap-2 tracking-[1.2px]" onClick={onSignOut}>
            <Plugs className="h-7 w-7" />
            Logout
          </button>

          <div className="h-1 w-full bg-white/10" />

          <Link href="/guide" className="flex items-center gap-2">
            <BookOpenText className="h-7 w-7" />
            Guide
          </Link>

          <Link href="https://discord.com/invite/36chp8DnzC" className="flex items-center gap-2">
            <DiscordLogo className="h-7 w-7" />
            Join us on Discord
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileDropdown;
