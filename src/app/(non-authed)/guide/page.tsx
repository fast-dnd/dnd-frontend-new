import MobileNavbar from "@/components/navbar/mobile-navbar";

import DesktopGuide from "./components/desktop-guide";

const Guide = () => {
  return (
    <>
      <DesktopGuide />

      <div className="flex flex-col gap-4 pb-4 lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
      </div>
    </>
  );
};

export default Guide;
