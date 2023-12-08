import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const BuildCommunity = () => {
  return (
    <div className="relative max-lg:mx-4">
      <div className="absolute inset-0 -z-10 rounded-lg bg-black lg:hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={"/images/communities-mage.png"}
            alt="wizard"
            width={295}
            height={271}
            className="absolute -bottom-16 w-full object-cover blur-[2px]"
          />
          <div className="absolute inset-0 rounded-lg bg-black/50 bg-gradient-to-t from-black via-black/90 via-30% to-transparent" />
        </div>
      </div>
      <Image
        src={"/images/communities-mage.png"}
        alt="wizard"
        width={295}
        height={271}
        className="absolute bottom-0 left-0 max-lg:hidden"
      />
      <div className="flex flex-col items-center gap-3 rounded-lg px-4 py-3 lg:flex-row lg:gap-10 lg:bg-black lg:p-6 lg:pl-[300px]">
        <div className="flex shrink-0 flex-col gap-2 leading-snug lg:w-[430px] lg:gap-3">
          <p className="font-light tracking-[2.24px] lg:text-[32px] lg:tracking-[4.48px]">
            MORE COMMUNITIES <br /> <span className="font-bold">ARE COMING</span>
          </p>
          <p className="font-light tracking-[1.05px] max-lg:text-sm lg:tracking-[1.2px]">
            Want to create your own? Build amazing adventures and distribute rewards to your
            community?
          </p>
        </div>

        <Button variant="google" className="w-full py-2 uppercase lg:py-5">
          BUILD&nbsp;<span className="max-lg:hidden">YOUR&nbsp;</span>COMMUNITY
        </Button>
      </div>
    </div>
  );
};

export default BuildCommunity;
