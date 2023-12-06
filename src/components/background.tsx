"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { backgroundStore } from "@/stores/background-store";

const Background = () => {
  const pathname = usePathname();
  const bgUrl = backgroundStore.use();
  const showBg = bgUrl && pathname.startsWith("/game");

  return (
    <div className="absolute -z-20 h-full w-full">
      <div className="absolute left-0 top-0 z-10 hidden h-64 w-full bg-gradient-to-b from-black via-black/40 via-60% to-transparent lg:block" />
      <Image
        src={showBg ? bgUrl : "/images/bg-cover.png"}
        fill
        priority
        quality={100}
        alt="bg-cover"
        className="hidden object-cover lg:block"
      />
    </div>
  );
};

export default Background;
