"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Background = () => {
  const pathname = usePathname();
  const [bgUrl, setBgUrl] = useState(localStorage.getItem("backgroundUrl"));
  const showBg = bgUrl && (pathname.startsWith("/room") || pathname.startsWith("/game"));

  useEffect(() => {
    const handleBgUpdate = () => {
      setBgUrl(localStorage.getItem("backgroundUrl"));
    };

    window.addEventListener("bgUpdate", handleBgUpdate);
    return () => window.removeEventListener("bgUpdate", handleBgUpdate);
  });

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
