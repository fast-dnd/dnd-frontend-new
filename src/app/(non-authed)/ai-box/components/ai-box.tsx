import React from "react";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import AiBoxDesktop from "./ai-box-desktop";
import AiBoxMobile from "./ai-box-mobile";

const AiBoxWrapper = () => {
  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 pb-12 lg:flex lg:flex-row lg:px-0">
        <AiBoxDesktop />
      </div>
      <div className="relative flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <AiBoxMobile />
      </div>
    </>
  );
};

export default AiBoxWrapper;
