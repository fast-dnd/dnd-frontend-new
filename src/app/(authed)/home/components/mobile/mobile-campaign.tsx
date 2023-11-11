"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ICampaign } from "@/types/campaign";
import { cn } from "@/utils/style-utils";

export const MobileCampaign = React.forwardRef<
  HTMLDivElement,
  {
    campaign: ICampaign;
    campaignDetailId?: string | undefined;
    setCampaignDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
    closingId?: string | undefined;
    opening?: boolean;
    setOpening?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
  }
>(
  (
    {
      campaign,
      campaignDetailId,
      setCampaignDetailId,
      closingId,
      opening = false,
      setOpening,
      animate = true,
    },
    ref,
  ) => {
    const open = campaignDetailId === campaign._id;
    const closing = closingId === campaign._id;

    return (
      <div
        className={cn(
          "relative flex h-[104px] w-full shrink-0 rounded border border-transparent bg-black pl-[118px]",
          open && "pointer-events-none static",
          open && !opening && "bg-transparent",
          !!campaignDetailId && !open && !opening && "hidden",
        )}
        ref={ref}
        onClick={() => {
          if (!campaignDetailId) {
            setCampaignDetailId?.(campaign._id);
            setOpening?.(true);
            setTimeout(() => setOpening?.(false), 500);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }}
      >
        <motion.div
          className={cn(
            "absolute inset-0 aspect-square w-[102px]",
            open && "z-20 w-full",
            closing && "z-20",
          )}
          layout={animate && (!campaignDetailId || open)}
          transition={{
            type: "tween",
            ease: "easeOut",
          }}
        >
          <Image
            alt=""
            draggable={false}
            src={campaign.imageUrl || "/images/default-dungeon.png"}
            width={1024}
            height={1024}
            className="aspect-square w-full"
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 aspect-square w-full bg-gradient-to-t from-dark-900 via-dark-900/90 via-15% to-transparent to-60% opacity-0 transition-all",
              open && "opacity-100",
            )}
          />
        </motion.div>

        <div
          className={cn(
            "z-10 flex w-full flex-col justify-between gap-3 py-3 opacity-100 transition-all duration-200",
            (open || closing) && !opening && "opacity-0",
          )}
        >
          <p className="line-clamp-2 w-full break-words font-semibold">{campaign.name}</p>

          <div className="flex gap-2">
            <p className="font-medium">By:</p>
            <Image
              src={campaign.createdBy?.imageUrl || "/images/default-avatar.png"}
              alt={campaign.createdBy?.username || ""}
              width={20}
              height={20}
              className="shrink-0 rounded-full"
            />
            <span className="truncate text-sm font-light">{campaign.createdBy?.username}</span>
          </div>
        </div>
      </div>
    );
  },
);

MobileCampaign.displayName = "MobileCampaign";
