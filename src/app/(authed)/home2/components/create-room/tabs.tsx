import React from "react";

import { cn } from "@/utils/style-utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tabsWithIcons } from "@/components/tabs-with-icons";

import { BaseTabType, subTabs, SubTabType, tabStore } from "./store/tab-store";

const Tabs = () => {
  const activeBaseTab = tabStore.baseTab.use();
  const activeSubTab = tabStore.subTab.use();

  return (
    <div className="mb-8 flex justify-between gap-6">
      <div className="flex gap-6">
        {tabsWithIcons.slice(0, 2).map((tab) => (
          <div
            key={tab.name}
            onClick={() => tabStore.baseTab.set(tab.name.toLowerCase() as BaseTabType)}
            className={cn(
              "flex cursor-pointer items-center gap-2 fill-white/50 text-xl text-white/50 transition-all duration-200 hover:fill-white hover:text-white",
              activeBaseTab === tab.name.toLowerCase() &&
                "fill-primary font-bold text-primary hover:fill-primary hover:text-primary",
            )}
          >
            {tab.icon}
            {tab.name}
          </div>
        ))}
      </div>
      <Select
        value={activeSubTab}
        onValueChange={(value) => tabStore.subTab.set(value as SubTabType)}
      >
        <SelectTrigger className="w-52 capitalize" aria-label="Select dungeon type">
          <SelectValue placeholder="Select adventure type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {subTabs.map((subTab) => (
              <SelectItem key={subTab} value={subTab} className="capitalize">
                {subTab}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Tabs;
