import React from "react";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import AiBoxSwitcher from "./ai-box-switcher";

interface AiBoxProps {
  state?: string;
}

const AiBoxWrapper: React.FC<AiBoxProps> = ({ state = "daily" }) => {
  return (
    <>
      <div className="hidden flex-1 flex-col gap-12 px-5 pb-12 lg:flex lg:flex-row lg:px-0">
        <AiBoxSwitcher state={state} />
      </div>
      <div className="relative flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <AiBoxSwitcher state={state} />
      </div>
    </>
  );
};

export default AiBoxWrapper;
