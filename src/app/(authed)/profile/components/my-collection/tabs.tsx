"use client";

import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";

import { tabsWithIcons } from "@/components/tabs-with-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import { Tab } from "./types/tab";

const Tabs = ({ activeTab }: { activeTab: Tab }) => {
  const router = useRouter();
  const pathname = usePathname();

  const onChangeTab = (tabName: string) => {
    const query = queryString.stringify({ activeTab: tabName });
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="flex h-14 shrink-0 justify-between gap-6">
      <div className="flex gap-6">
        {tabsWithIcons.map((tab) => (
          <div
            onClick={() => onChangeTab(tab.name)}
            key={tab.name}
            className={cn(
              "flex cursor-pointer items-center gap-2 fill-white/50 text-xl text-white/50 transition-all duration-200 hover:fill-white hover:text-white",
              activeTab === tab.name &&
                "fill-primary font-bold text-primary hover:fill-primary hover:text-primary",
            )}
          >
            {tab.icon}
            {tab.name}
          </div>
        ))}
      </div>
      {(activeTab === "ADVENTURES" || activeTab === "CAMPAIGNS") && (
        <Button
          className="w-fit uppercase"
          href={`/create-${activeTab.slice(0, -1).toLowerCase()}`}
        >
          CREATE NEW {activeTab.slice(0, -1)}
        </Button>
      )}
    </div>
  );
};

export default Tabs;
