import React from "react";
import { usePathname, useRouter } from "next/navigation";

import Rewards from "@/components/rewards";
import { cn } from "@/utils/style-utils";

import Adventures from "./adventures";
import Campaigns from "./campaigns";
import History from "./history";

export const tabs = ["Adventures", "Campaigns", "History", "Rewards"] as const;
export type Tab = (typeof tabs)[number];

const MobileMyCollection = ({ showGameHistory }: { showGameHistory?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = React.useState<Tab>(showGameHistory ? "History" : "Adventures");

  return (
    <>
      <div className="flex w-full justify-between gap-4 overflow-auto">
        {tabs.map((tab) => (
          <p
            key={tab}
            className={cn(
              "border-b-2 border-transparent py-2 text-sm font-medium text-white/50 transition-all duration-300",
              activeTab === tab && "border-b-primary text-primary",
            )}
            onClick={() => {
              router.push(pathname);
              setActiveTab(tab);
            }}
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
