"use client";

import { Fragment } from "react";

import { cn } from "@/utils/style-utils";

import {
  baseTabs,
  BaseTabType,
  homeStore,
  homeTabs,
  HomeTabType,
  subTabs,
  SubTabType,
} from "../stores/tab-store";

interface ITabsProps {
  type: "home" | "base" | "sub";
  selectedTab?: string;
  onTabClick?: (prevTab?: HomeTabType | BaseTabType | SubTabType) => void;
}

const Tabs = ({ selectedTab, type, onTabClick }: ITabsProps) => {
  const tabs = type === "home" ? homeTabs : type === "base" ? baseTabs : subTabs;

  const onTabClickHandler = (tab: HomeTabType | BaseTabType | SubTabType) => {
    const prevTab =
      type === "home"
        ? homeStore.homeTab.get()
        : type === "base"
        ? homeStore.baseTab.get()
        : homeStore.subTab.get();
    if (type === "home") homeStore.homeTab.set(tab as HomeTabType);
    else if (type === "base") homeStore.baseTab.set(tab as BaseTabType);
    else homeStore.subTab.set(tab as SubTabType);
    onTabClick?.(prevTab);
  };

  return (
    <div className={cn("hidden lg:flex", type === "home" && "my-6 items-center justify-center")}>
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
