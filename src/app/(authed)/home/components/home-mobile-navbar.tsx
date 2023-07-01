import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";
import { MdMenu } from "react-icons/md";
import { homeTabs } from "../types/home";
import { useHomeStore } from "../stores/tab-store";

const HomeMobileNavbar = () => {
  const { homeTab, setHomeTab, setDisplayHowToPlay } = useHomeStore((state) => state);
  return (
    <div className="flex justify-between py-8 px-5 md:hidden">
      <p style={jibril.style} className="text-lg font-bold text-white">
        V
      </p>
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
            <div className={cn("self-end")} onClick={() => setDisplayHowToPlay(true)}>
              <p className="text-lg leading-7 tracking-widest whitespace-nowrap uppercase">
                HOW TO PLAY
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HomeMobileNavbar;
