import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { useHomeStore } from "../stores/tab-store";
import { homeTabs } from "../types/home";

const HomeMobileNavbar = () => {
  const { homeTab, setHomeTab, setDisplayHowToPlay } = useHomeStore((state) => state);
  return (
    <div className="flex justify-between py-8 px-5 lg:hidden">
      <Image src="/images/mobile-navbar-logo.svg" width={36} height={24} alt="mobile-navbar-logo" />

      <p className="text-lg font-medium tracking-widest uppercase">{homeTab}</p>
      <Sheet>
        <SheetTrigger>
          <MdMenu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-12 flex flex-col min-w-fit items-center gap-6">
            {homeTabs.map<React.ReactNode>((tab, index) => (
              <div
                key={tab}
                className={cn(
                  "self-end",
                  tab === homeTab && "font-extrabold border-b-2 border-tomato ",
                )}
                onClick={() => {
                  setDisplayHowToPlay(false);
                  setHomeTab(tab);
                }}
              >
                <p className="text-lg leading-7 tracking-widest whitespace-nowrap uppercase">
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
