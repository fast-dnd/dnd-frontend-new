"use client";

import { cn } from "@/utils/style-utils";
import { Dispatch, SetStateAction } from "react";

const Tabs = <TValue extends string>(props: {
  tabs: readonly TValue[];
  selectedTab: TValue;
  setTab: Dispatch<SetStateAction<TValue>>;
  onTabClick?: () => void;
}) => {
  const { tabs, selectedTab, setTab, onTabClick } = props;
  return (
    <div className="flex flex-row min-w-fit items-center gap-6">
      {tabs
        .map<React.ReactNode>((tab) => (
          <div
            key={tab}
            className={cn(
              "cursor-pointer",
              tab === selectedTab && "font-extrabold border-b-2 border-tomato"
            )}
            onClick={() => {
              setTab(tab);
              onTabClick?.();
            }}
          >
            <p className="text-[22px] leading-7 tracking-[0.15em] -mr-[0.15em] whitespace-nowrap uppercase">
              {tab}
            </p>
          </div>
        ))
        .reduce((prev, curr) => [
          prev,
          <div
            className="w-2 h-2 rotate-45 bg-white opacity-25"
            key={`${prev}${curr}`}
          />,
          curr,
        ])}
    </div>
  );
};

export default Tabs;
