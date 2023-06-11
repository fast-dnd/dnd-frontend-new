"use client";

import { cn } from "@/utils/style-utils";
import { Fragment } from "react";
import { useTabStore } from "../stores/tab-store";
import { DungeonTabType, HomeTabType, dungeonTabs, homeTabs } from "../types/home";

interface ITabsProps {
  homeOrDungeons: "home" | "dungeon";
  selectedTab?: string;
  onTabClick?: () => void;
}

const Tabs = ({ selectedTab, homeOrDungeons, onTabClick }: ITabsProps) => {
  const tabs = homeOrDungeons === "home" ? homeTabs : dungeonTabs;

  const { setDungeonTab, setHomeTab } = useTabStore((state) => state);

  return (
    <div className="flex flex-row min-w-fit items-center gap-6">
      {tabs.map<React.ReactNode>((tab, index) => (
        <Fragment key={tab}>
          <div
            className={cn(
              "cursor-pointer",
              tab === selectedTab && "font-extrabold border-b-2 border-tomato",
            )}
            onClick={() => {
              if (homeOrDungeons === "home") setHomeTab(tab as HomeTabType);
              else setDungeonTab(tab as DungeonTabType);
              onTabClick?.();
            }}
          >
            <p className="text-[22px] leading-7 tracking-[0.15em] -mr-[0.15em] whitespace-nowrap uppercase">
              {tab}
            </p>
          </div>
          {index !== tabs.length - 1 && <div className="w-2 h-2 rotate-45 bg-white opacity-25" />}
        </Fragment>
      ))}
    </div>
  );
};

export default Tabs;
