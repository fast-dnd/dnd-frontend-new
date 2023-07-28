import Image from "next/image";
import { MdMenu } from "react-icons/md";

import { cn } from "@/utils/style-utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { homeStore, homeTabs } from "../stores/tab-store";

const HomeMobileNavbar = () => {
  const homeTab = homeStore.homeTab;

  return (
    <div className="flex justify-between px-5 py-8 lg:hidden">
      <Image src="/images/mobile-navbar-logo.svg" width={36} height={24} alt="mobile-navbar-logo" />

      <p className="text-lg font-medium uppercase tracking-widest">{homeTab.get()}</p>
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
                  tab === homeTab.get() && "border-b-2 border-primary font-extrabold",
                )}
                onClick={() => homeTab.set(tab)}
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
