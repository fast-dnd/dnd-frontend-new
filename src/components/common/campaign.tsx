import React from "react";
import Image from "next/image";
import { Copy } from "iconsax-react";
import { GiCheckMark } from "react-icons/gi";

import useCopy from "@/hooks/helpers/use-copy";
import { ICampaign } from "@/types/campaign";
import { cn } from "@/utils/style-utils";

import AddToFavorites from "./add-to-favorites";
import DeleteModal from "./delete-modal";

interface ICampaignProps {
  campaign: ICampaign;
  setCampaignDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  isOwned?: boolean;
  showActions?: boolean;
  addFavorite?: boolean;
}

export const Campaign = React.forwardRef<HTMLDivElement, ICampaignProps>(
  ({ campaign, setCampaignDetailId, isOwned, showActions, addFavorite }, ref) => {
    const { copied, onCopy } = useCopy();

    return (
      <div
        className={cn(
          "glass-effect",
          "flex w-full cursor-pointer gap-8 rounded-md p-4 hover:bg-white/5",
        )}
        ref={ref}
        onClick={() => setCampaignDetailId && setCampaignDetailId(campaign._id)}
      >
        <Image
          src={campaign.imageUrl || "/images/default-dungeon.png"}
          alt={campaign.name ?? ""}
          width={200}
          height={200}
          className="size-16 rounded-md lg:size-[200px]"
        />
        <div className="flex w-full min-w-0 flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex min-w-0 flex-1 gap-8">
              <p className="truncate text-2xl font-bold uppercase">{campaign.name}</p>
              {isOwned && (
                <div className="rounded-md border border-white/25">
                  <p className="px-3 py-1 text-sm capitalize">
                    {campaign.publiclySeen ? "Public" : "Private"}
                  </p>
                </div>
              )}
            </div>
            {addFavorite && <AddToFavorites type="campaign" id={campaign._id} />}
            {showActions && (
              <div className="mr-8 flex shrink-0 gap-4" onClick={(e) => e.stopPropagation()}>
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
                className="rounded-md lg:size-[20px]"
              />
              {campaign.createdBy.username}
            </div>
          )}
          <p className="text-xl">{campaign.description}</p>
          <div className="mb-1 mt-auto flex w-full justify-between"></div>
        </div>
      </div>
    );
  },
);

Campaign.displayName = "Campaign";
