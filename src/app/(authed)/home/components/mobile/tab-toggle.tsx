import { motion } from "framer-motion";

import HelmetIcon from "@/components/icons/helmet-icon";
import SwordsIcon from "@/components/icons/swords-icon";
import { cn } from "@/utils/style-utils";

import { baseTabs, tabStore } from "../../stores/tab-store";

const TabToggle = ({ hide }: { hide: boolean }) => {
  const activeBaseTab = tabStore.baseTab.use();

  return (
    <div
      className={cn(
        "flex justify-center px-4 opacity-100 transition-all duration-500",
        hide && "pointer-events-none opacity-0",
      )}
    >
      <div className="relative flex rounded-full border border-white/[8%] bg-black">
        {baseTabs.map((tab) => (
          <div
            key={tab}
            className={cn(
              "z-10 mx-5 my-2.5 flex select-none items-center text-sm uppercase opacity-50 transition-all",
              tab === "adventures" && "gap-1",
              tab === "campaigns" && "gap-2.5",
              activeBaseTab === tab && "opacity-100",
            )}
            onClick={() => {
              tabStore.baseTab.set(tab);
            }}
          >
            {tab === "adventures" && <HelmetIcon className="h-4 w-4" />}
            {tab === "campaigns" && <SwordsIcon className="h-4 w-4 fill-white" />}

            {tab}
          </div>
        ))}

        <div
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-start p-0.5",
            activeBaseTab === "campaigns" && "justify-end",
          )}
        >
          <motion.div
            className={cn(
              "h-9 w-[154px] rounded-full bg-primary",
              activeBaseTab === "campaigns" && "w-[150px]",
            )}
            layout
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default TabToggle;
