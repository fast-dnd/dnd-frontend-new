import React from "react";

import { tabsWithIcons } from "@/components/common/tabs-with-icons";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/utils/style-utils";

import { BaseTabType, subTabs, SubTabType, tabStore } from "../../../stores/tab-store";

const Tabs = ({
  setSearchName,
}: {
  setSearchName?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const activeBaseTab = tabStore.baseTab.use();
  const activeSubTab = tabStore.subTab.use();

  return (
    <div className="flex justify-between gap-6">
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
      <div className="flex items-center gap-4">
        {!!setSearchName && (
          <Input
            placeholder="🔎 Search..."
            className="m-0 py-2 leading-none"
            onChange={(e) => setSearchName(e.target.value)}
          />
        )}

        <Select
          value={activeSubTab}
          onChange={(value) => tabStore.subTab.set(value as SubTabType)}
          options={subTabs.map((tab) => ({ value: tab, label: tab }))}
          className="mb-0 w-52 capitalize"
        />
      </div>
    </div>
  );
};

export default Tabs;
