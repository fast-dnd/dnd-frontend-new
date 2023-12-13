import React from "react";
import Image from "next/image";

import { Dungeon } from "@/components/dungeon";
import Skeleton from "@/components/ui/skeleton";
import useGetCampaign from "@/hooks/queries/use-get-campaign";

interface ICampaignDetailProps {
  campaignDetailId?: string | undefined;
  setDungeonDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CampaignDetail = ({ setDungeonDetailId, campaignDetailId }: ICampaignDetailProps) => {
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
      <div className="flex gap-8 rounded-md ">
        <Image
          src={campaign.imageUrl || "/images/default-dungeon.png"}
          alt={campaign.name ?? ""}
          width={200}
          height={200}
          className="h-16 w-16 rounded-md lg:h-[200px] lg:w-[200px]"
        />
        <div className="flex w-full min-w-0 flex-col gap-4">
          <p className="truncate text-2xl font-bold uppercase">{campaign.name}</p>
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
            // ref={lastDungeonRef}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignDetail;
