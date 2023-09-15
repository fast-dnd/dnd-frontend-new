"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/utils/style-utils";
import { Button } from "@/components/ui/button";
import { tabsWithIcons } from "@/components/tabs-with-icons";

import { Tab } from "./types/tab";

const Tabs = ({ activeTab }: { activeTab: Tab }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeTab = (tabName: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const value = tabName;

    if (!value) {
      current.delete("activeTab");
    } else {
      current.set("activeTab", tabName);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="mb-8 flex justify-between gap-6">
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
        <Button className="w-fit uppercase">CREATE NEW {activeTab.slice(0, -1)}</Button>
      )}
    </div>
  );
};

export default Tabs;
