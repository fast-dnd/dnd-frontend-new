import Image from "next/image";
import { MdMenu } from "react-icons/md";

import { cn } from "@/utils/style-utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useHomeStore } from "../stores/tab-store";
import { homeTabs } from "../types/home";

const HomeMobileNavbar = () => {
  const { homeTab, setHomeTab, setDisplayHowToPlay } = useHomeStore((state) => state);

  return (
    <div className="flex justify-between px-5 py-8 lg:hidden">
      <Image src="/images/mobile-navbar-logo.svg" width={36} height={24} alt="mobile-navbar-logo" />

      <p className="text-lg font-medium uppercase tracking-widest">{homeTab}</p>
      <Sheet>
        <SheetTrigger aria-label="Mobile sidebar">
          <MdMenu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-12 flex min-w-fit flex-col items-center gap-6">
            {homeTabs.map<React.ReactNode>((tab) => (
              <div
                key={tab}
                className={cn(
                  "self-end",
                  tab === homeTab && "border-b-2 border-tomato font-extrabold",
                )}
                onClick={() => {
                  setDisplayHowToPlay(false);
                  setHomeTab(tab);
                }}
              >
                <p className="whitespace-nowrap text-lg uppercase leading-7 tracking-widest">
                  {tab}
                </p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HomeMobileNavbar;
