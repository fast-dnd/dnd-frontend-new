import React from "react";

import { cn } from "@/utils/style-utils";

import Adventures from "./adventures";
import Campaigns from "./campaigns";
import History from "./history";
import Rewards from "./rewards";

export const tabs = ["Adventures", "Campaigns", "History", "Rewards"] as const;
export type Tab = (typeof tabs)[number];

const MobileMyCollection = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>("Adventures");

  return (
    <>
      <div className="flex w-full justify-between gap-4">
        {tabs.map((tab) => (
          <p
            key={tab}
            className={cn(
              "py-2 text-sm font-medium text-white/50 transition-all duration-300",
              activeTab === tab && "border-b-2 border-b-primary text-primary",
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </p>
        ))}
      </div>
      {activeTab === "Adventures" && <Adventures />}
      {activeTab === "Campaigns" && <Campaigns />}
      {activeTab === "History" && <History />}
      {activeTab === "Rewards" && <Rewards />}
    </>
  );
};

export default MobileMyCollection;
