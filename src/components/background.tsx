"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { backgroundStore } from "@/stores/background-store";

const Background = () => {
  const pathname = usePathname();
  const bgUrl = backgroundStore.bgUrl.use();
  const showBg = bgUrl && (pathname.startsWith("/room") || pathname.startsWith("/game"));

  return (
    <div className="absolute -z-10 h-[110%] w-full lg:h-full">
      <Image
        src={showBg ? bgUrl : "/images/bg-cover.png"}
        fill
        priority
        quality={100}
        alt="bg-cover"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default Background;
