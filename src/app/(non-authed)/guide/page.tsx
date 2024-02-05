import MobileNavbar from "@/components/navbar/mobile-navbar";

import DesktopGuide from "./components/desktop-guide";
import MobileGuide from "./components/mobile-guide";

const Guide = () => {
  return (
    <>
      <DesktopGuide />

      <div className="flex flex-1 flex-col gap-4 lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <MobileGuide />
      </div>
    </>
  );
};

export default Guide;
