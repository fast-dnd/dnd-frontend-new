import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/utils/style-utils";

import { BaseTab } from "../../utils/tabs";

interface ITabToggleProps {
  tabs: readonly BaseTab[];
  activeTab: BaseTab;
  setActiveTab: React.Dispatch<React.SetStateAction<BaseTab>>;
}

const TabToggle = ({ tabs, activeTab, setActiveTab }: ITabToggleProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn("flex justify-center")}>
      <div className="pointer-events-auto relative flex w-full rounded-full border border-white/[8%] bg-black">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={cn(
              "z-10 mx-5 my-2.5 flex w-1/2 select-none items-center justify-center whitespace-nowrap text-sm uppercase opacity-50 transition-all",
              tab === "MY PROFILE" && "gap-10",
              tab === "MY COLLECTIONS" && "gap-2.5",
              activeTab === tab && "opacity-100",
            )}
            onClick={() => {
              router.push(pathname);
              setActiveTab(tab);
            }}
          >
            {tab}
          </div>
        ))}

        <div
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-start p-0.5",
            activeTab === "MY COLLECTIONS" && "justify-end",
          )}
        >
          <motion.div
            className={cn("h-9 w-1/2 rounded-full bg-primary")}
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
