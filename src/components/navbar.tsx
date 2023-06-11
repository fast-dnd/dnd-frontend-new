import React from "react";
import Image from "next/image";
import { jibril } from "@/utils/fonts";

const Navbar = () => {
  return (
    <div className="flex gap-12 items-center">
      <div className="mt-10 flex-1 h-0.5 border-t border-tomato" />
      <div className="mt-10 flex items-center justify-center flex-col gap-1">
        <Image src="/images/logo-up.png" width={114} height={6} alt="logo-up" />
        <div className="relative flex w-[204px] justify-center">
          <div className="absolute w-full h-full flex items-center justify-center">
            <Image src="/images/logo-red-layer.png" width={204} height={35} alt="logo-red-layer" />
          </div>
          <div className="absolute w-full h-full flex items-center justify-center z-20">
            <p
              style={jibril.style}
              className="text-2xl tracking-[0.415em] text-center indent-[0.415em] uppercase"
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
      <div className="mt-10 flex-1 h-0.5 border-t border-tomato" />
    </div>
  );
};

export default Navbar;
