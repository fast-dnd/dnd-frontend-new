import React from "react";
import Image from "next/image";
import { Copy } from "iconsax-react";
import { GiCheckMark } from "react-icons/gi";

import useCopy from "@/hooks/use-copy";
import { ICampaign } from "@/types/campaign";

import DeleteModal from "./delete-modal";

export const Campaign = React.forwardRef<
  HTMLDivElement,
  {
    campaign: ICampaign;
    setCampaignDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
    isOwned?: boolean;
    showActions?: boolean;
  }
>(({ campaign, setCampaignDetailId, isOwned, showActions }, ref) => {
  const { copied, onCopy } = useCopy();

  return (
    <div
      className="flex cursor-pointer gap-8 rounded-md p-4 hover:bg-white/5"
      ref={ref}
      onClick={() => setCampaignDetailId && setCampaignDetailId(campaign._id)}
    >
      <Image
        src={campaign.imageUrl || "/images/default-dungeon.png"}
        alt={campaign.name ?? ""}
        width={200}
        height={200}
        className="h-16 w-16 rounded-md lg:h-[200px] lg:w-[200px]"
      />
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold uppercase">{campaign.name}</p>
          {showActions && (
            <div className="mr-8 flex gap-4" onClick={(e) => e.stopPropagation()}>
              <div
                className="flex items-center gap-2 text-white/50 transition-all duration-200 hover:text-info"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(campaign._id);
                }}
              >
                <p>{copied ? "Copied" : "Copy ID"}</p>{" "}
                {copied ? <GiCheckMark /> : <Copy variant="Bold" />}
              </div>
              <DeleteModal id={campaign._id} type="campaign" />
            </div>
          )}
        </div>
        {!isOwned && campaign.createdBy && (
          <div className="flex gap-2">
            <Image
              src={campaign.createdBy.imageUrl || "/images/default-avatar.png"}
              alt={campaign.createdBy.username}
              width={20}
              height={20}
              className="rounded-md lg:h-[20px] lg:w-[20px]"
            />
            {campaign.createdBy.username}
          </div>
        )}
        <p className="text-xl">{campaign.description}</p>
        <div className="mb-1 mt-auto flex w-full justify-between"></div>
      </div>
    </div>
  );
});

Campaign.displayName = "Campaign";
