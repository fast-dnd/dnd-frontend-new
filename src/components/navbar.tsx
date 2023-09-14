"use client";

import Image from "next/image";

import useGetAccount from "@/hooks/use-get-account";

const Navbar = () => {
  const { data: account } = useGetAccount();

  return (
    <div className="hidden items-center justify-between gap-12 pl-2 pr-8 lg:flex">
      <Image src="/images/logo.png" width={300} height={100} alt="logo" />
      <div className="flex items-center gap-6 text-2xl leading-7 tracking-[3.3px]">
        <p>PLAY</p>
        <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
        <p>HOW TO PLAY</p>
        <div className="h-2 w-2 rotate-45 bg-white opacity-25" />
        <Image
          src={account?.account.imageUrl || "/images/default-avatar.png"}
          width={60}
          height={60}
          alt="avatar"
          className="rounded-md"
        />
        <div className="flex gap-6 rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <Image src="/images/dm-coin.png" alt="dm-coin" height={40} width={40} />
            {account?.account.coins ?? "-"}
          </div>
          <div className="flex items-center gap-1">
            <Image src="/images/dm-coin.png" alt="dm-coin" height={40} width={40} />
            {account?.account.dmCurrency ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
