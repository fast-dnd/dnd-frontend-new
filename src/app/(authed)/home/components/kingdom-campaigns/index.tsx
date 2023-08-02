"use client";

import Skeleton from "@/components/ui/skeleton";

import { useGetMyCampaigns } from "../../hooks/use-get-home-data";
import { homeStore } from "../../stores/tab-store";
import KingdomCampaign from "./kingdom-campaign";

const KingdomCampaigns = () => {
  const { data: myCampaigns, isLoading } = useGetMyCampaigns(
    homeStore.homeTab.get() === "MY KINGDOM" && homeStore.kingdomTab.get() === "campaigns",
  );

  if (isLoading) return <Skeleton />;

  if (!myCampaigns) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex h-[400px] flex-col gap-4 overflow-y-auto lg:max-h-full lg:flex-1 lg:pr-8">
      {myCampaigns.map((campaign) => (
        <KingdomCampaign key={campaign._id} campaign={campaign} />
      ))}
    </div>
  );
};

export default KingdomCampaigns;
