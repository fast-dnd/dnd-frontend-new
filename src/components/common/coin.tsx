import React from "react";
import Image from "next/image";

import { cn } from "@/utils/style-utils";

interface ICoinProps {
  silver?: boolean;
}

const Coin = ({ silver = false }: ICoinProps) => {
  return (
    // <div className="relative h-[30px] w-[30px] rounded-[5px] bg-rose-500 bg-opacity-10">
    //   <img className="absolute left-[5px] top-[4.50px] h-5 w-5" src="/images/dm-coin.png" />
    //   <div className="absolute left-[7px] top-[6.50px] h-4 w-4 rounded-[9px] bg-zinc-300 mix-blend-color" />
    // </div>
    <Image
      src={`/images/${silver ? "silver" : "gold"}-coin.png`}
      alt="dm-coin"
      height={40}
      width={40}
      className={cn(silver ? "h-5 w-5" : "h-8 w-8")}
    />
  );
};

export default Coin;
