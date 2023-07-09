import React from "react";
import Image from "next/image";

import { jibril } from "@/utils/fonts";

const Navbar = () => {
  return (
    <div className="hidden items-center gap-12 lg:flex">
      <div className="mt-10 h-0.5 flex-1 border-t border-tomato" />
      <div className="mt-10 flex flex-col items-center justify-center gap-1">
        <Image src="/images/logo-up.png" width={114} height={6} alt="logo-up" />
        <div className="relative flex w-52 justify-center">
          <div className="absolute flex h-full w-full items-center justify-center">
            <Image src="/images/logo-red-layer.png" width={204} height={35} alt="logo-red-layer" />
          </div>
          <div className="absolute z-20 flex h-full w-full items-center justify-center">
            <p
              style={jibril.style}
              className="absolute top-0 translate-y-1/4 text-center indent-[0.415em] text-2xl uppercase tracking-[0.415em]"
            >
              v3rpg
            </p>
          </div>
          <Image
            className="z-10"
            src="/images/logo-black-layer.png"
            alt="logo-black-layer"
            width={199}
            height={42}
          />
        </div>
        <Image src="/images/logo-down.png" width={72} height={14} alt="logo-down" />
      </div>
      <div className="mt-10 h-0.5 flex-1 border-t border-tomato" />
    </div>
  );
};

export default Navbar;
