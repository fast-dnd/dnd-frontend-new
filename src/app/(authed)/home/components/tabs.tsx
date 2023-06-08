"use client";

import { cn } from "@/utils/style-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dungeonTabs, homeTabs } from "../types/home";
import { Fragment } from "react";

interface ITabsProps {
  homeOrDungeons: "home" | "dungeon";
  selectedTab?: string;
  onTabClick?: () => void;
}

const Tabs = ({ selectedTab, homeOrDungeons, onTabClick }: ITabsProps) => {
  const tabs = homeOrDungeons === "home" ? homeTabs : dungeonTabs;
  const pathname = usePathname();

  return (
    <div className="flex flex-row min-w-fit items-center gap-6">
      {tabs.map<React.ReactNode>((tab, index) => (
        <Fragment key={tab}>
          <Link
            className={cn(
              "cursor-pointer",
              tab === selectedTab && "font-extrabold border-b-2 border-tomato"
            )}
            onClick={onTabClick}
            href={{
              pathname,
              query: {
                [homeOrDungeons === "home" ? "homeTab" : "dungeonTab"]: tab,
              },
            }}
          >
            <p className="text-[22px] leading-7 tracking-[0.15em] -mr-[0.15em] whitespace-nowrap uppercase">
              {tab}
            </p>
          </Link>
          {index !== tabs.length - 1 && (
            <div className="w-2 h-2 rotate-45 bg-white opacity-25" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Tabs;
