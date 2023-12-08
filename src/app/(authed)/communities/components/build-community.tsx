import React from "react";

import { Button } from "@/components/ui/button";

const BuildCommunity = () => {
  return (
    <div className="absolute bottom-6 px-4 lg:bottom-16 lg:mx-[12.5%]  lg:w-[68.5%]">
      <div className="absolute inset-0 h-full w-full blur-[2px]">
        {/* <div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-black from-40% to-transparent to-70%" /> */}
        {/* <Image
              src={"/images/login-mage1.png"}
              alt="wizard"
              height={200}
              width={330}
              className="absolute inset-0 h-full w-full"
            /> */}
      </div>
      <div className="flex flex-col bg-black p-4">
        <p className="font-light tracking-[2.24px]">
          MORE COMMUNITIES <br /> <span className="font-bold">ARE COMING</span>
        </p>
        <p className="font-light tracking-wide">
          Want to create your own? Build amazing adventures and distribute rewards to your
          community?
        </p>
        <Button variant="google" className="mt-4 w-full uppercase">
          BUILD COOMMUNITY
        </Button>
      </div>
    </div>
  );
};

export default BuildCommunity;
