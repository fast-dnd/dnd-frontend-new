import React from "react";
import Image from "next/image";

import { Dungeon } from "@/components/common/dungeon";
import Skeleton from "@/components/ui/skeleton";
import useGetCampaign from "@/hooks/queries/use-get-campaign";
import { cn } from "@/utils/style-utils";

import AddToFavorites from "./add-to-favorites";

interface ICampaignDetailProps {
  campaignDetailId: string;
  setDungeonDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  addFavorite?: boolean;
}

const CampaignDetail = ({
  setDungeonDetailId,
  campaignDetailId,
  addFavorite,
}: ICampaignDetailProps) => {
  const { data: campaign, isLoading } = useGetCampaign(campaignDetailId ?? "");

  if (isLoading)
    return (
      <div className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto">
        <p>CAMPAIGN</p>
        <Skeleton />

        <p>ADVENTURES</p>
        <div className="flex flex-col gap-8">
          <Skeleton amount={2} />
        </div>
      </div>
    );

  if (!campaign) return <div>Something went wrong</div>;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto pr-4">
      <p>CAMPAIGN</p>
      <div
        className={cn(
          "glass-effect",
          "flex w-full cursor-pointer gap-8 rounded-md border-2 border-transparent bg-dark-900 p-4 transition-all duration-200 hover:bg-white/5",
        )}
        // style={{
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E")`,
        // }}
      >
        <Image
          src={campaign.imageUrl || "/images/default-dungeon.png"}
          alt={campaign.name ?? ""}
          width={200}
          height={200}
          className="size-16 rounded-md lg:size-[200px]"
        />
        <div className="flex w-full min-w-0 flex-col gap-4">
          <div className="flex justify-between gap-4 pr-4">
            <p className="truncate text-2xl font-bold uppercase">{campaign.name}</p>
            {addFavorite && <AddToFavorites type="campaign" id={campaignDetailId} />}
          </div>
          <p className="text-xl">{campaign.description}</p>
          <div className="mb-1 mt-auto flex w-full justify-between"></div>
        </div>
      </div>

      <p>ADVENTURES</p>
      <div className="flex flex-col gap-8">
        {campaign.dungeons.map((dungeon) => (
          <Dungeon
            key={dungeon._id}
            dungeon={dungeon}
            setDungeonDetailId={setDungeonDetailId}
            addFavorite={addFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignDetail;
