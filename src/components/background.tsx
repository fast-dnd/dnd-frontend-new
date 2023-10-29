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
