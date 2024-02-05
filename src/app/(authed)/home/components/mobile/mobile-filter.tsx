import { AiOutlineClose } from "react-icons/ai";
import { PiSlidersFill } from "react-icons/pi";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/utils/style-utils";

import { subTabs, tabStore } from "../../stores/tab-store";

interface IMobileFilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileFilter = ({ open, setOpen }: IMobileFilterProps) => {
  const activeSubTab = tabStore.subTab.use();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[8%] bg-black">
          <PiSlidersFill />
        </div>
      </DialogTrigger>
      <DialogContent
        fromBottom
        className="pointer-events-auto bottom-0 left-0 top-auto flex h-fit w-full max-w-full translate-x-0 translate-y-0 flex-col bg-black/80 p-0 pb-4 focus:border-0 focus:ring-0"
      >
        <div className="flex h-14 w-full items-start justify-between bg-gradient-to-b from-black to-transparent p-4">
          <span className="text-xs font-medium uppercase">Filters</span>
          <AiOutlineClose className="h-4 w-4" onClick={() => setOpen(false)} />
        </div>
        <div className="flex w-full flex-col">
          {subTabs.map((subTab) => (
            <div
              key={subTab}
              onClick={() => tabStore.subTab.set(subTab)}
              className={cn(
                "flex h-11 w-full items-center py-3 pl-8 font-bold uppercase tracking-[1.2px]",
                activeSubTab === subTab && "bg-dark-700 text-primary",
              )}
            >
              {subTab}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileFilter;
