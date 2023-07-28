"use client";

import { Fragment } from "react";

import { cn } from "@/utils/style-utils";

import { dungeonTabs, DungeonTabType, homeStore, homeTabs, HomeTabType } from "../stores/tab-store";

interface ITabsProps {
  homeOrDungeons: "home" | "dungeon";
  selectedTab?: string;
  onTabClick?: () => void;
}

const Tabs = ({ selectedTab, homeOrDungeons, onTabClick }: ITabsProps) => {
  const tabs = homeOrDungeons === "home" ? homeTabs : dungeonTabs;

  const onTabClickHandler = (tab: HomeTabType | DungeonTabType) => {
    if (homeOrDungeons === "home") homeStore.homeTab.set(tab as HomeTabType);
    else homeStore.dungeonTab.set(tab as DungeonTabType);
    onTabClick?.();
  };

  return (
    <div
      className={cn(
        "hidden lg:flex",
        homeOrDungeons === "home" && "my-6 items-center justify-center",
      )}
    >
      <div className="flex min-w-fit flex-row items-center gap-6">
        {tabs.map<React.ReactNode>((tab, index) => (
          <Fragment key={tab}>
            <div
              className={cn(
                "cursor-pointer",
                tab === selectedTab && "border-b-2 border-primary font-extrabold",
              )}
              onClick={() => onTabClickHandler(tab)}
            >
              <p className="mr-[-0.15em] whitespace-nowrap text-[22px] uppercase leading-7 tracking-[0.15em]">
                {tab}
              </p>
            </div>
            {index !== tabs.length - 1 && <div className="h-2 w-2 rotate-45 bg-white opacity-25" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
