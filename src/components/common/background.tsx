"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { backgroundStore } from "@/stores/background-store";

const Background = () => {
  const { isDefault } = useCommunity();
  const { data: currentCommunity } = useGetCurrentCommunity();

  const pathname = usePathname();

  const displayBg = !(pathname.includes("/communities") || pathname.includes("/guide"));

  const bgUrl = backgroundStore.use();
  const showBg = bgUrl && pathname.startsWith("/game");

  const bgSrc = isDefault
    ? showBg
      ? bgUrl
      : "/images/bg-cover.png"
    : currentCommunity?.backgroundImgUrl ?? "/images/bg-cover.png";

  return (
    <div className="absolute -z-20 size-full">
      <div className="absolute left-0 top-0 z-10 hidden h-64 w-full bg-gradient-to-b from-black via-black/40 via-60% to-transparent lg:block" />
      {displayBg && (
        <Image
          src={bgSrc}
          fill
          priority
          quality={100}
          alt="bg-cover"
          className="hidden object-cover lg:block"
        />
      )}
    </div>
  );
};

export default Background;
