import React from "react";
import Image from "next/image";

import { cn } from "@/utils/style-utils";

interface ICoinProps {
  silver?: boolean;
}

const Coin = ({ silver = false }: ICoinProps) => {
  return (
    <Image
      src={`/images/${silver ? "silver" : "gold"}-coin.png`}
      alt="dm-coin"
      height={40}
      width={40}
      className={cn(silver ? "size-5" : "size-8")}
    />
  );
};

export default Coin;
