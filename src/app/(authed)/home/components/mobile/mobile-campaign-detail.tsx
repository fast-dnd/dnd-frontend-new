"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

import useGetCampaign from "@/hooks/queries/use-get-campaign";
import { cn } from "@/utils/style-utils";

import { MobileAdventure } from "./mobile-adventure";

const MobileCampaignDetail = ({
  campaignDetailId,
  adventureDetailId,
  closingId,
  setAdventureDetailId,
  onClose,
}: {
  campaignDetailId?: string | undefined;
  adventureDetailId?: string | undefined;
  closingId?: string | undefined;
  setAdventureDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  onClose?: () => void;
}) => {
  const { data: campaign, isLoading } = useGetCampaign(campaignDetailId ?? "");
  const [opening, setOpening] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!!campaignDetailId && !isLoading && !!campaign && (
        <>
          <motion.div
            className={cn("pointer-events-none absolute inset-0 z-30 h-fit w-full pt-[50vw]")}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-20 bg-dark-900 opacity-0 transition-all duration-500",
                adventureDetailId && "pointer-events-auto opacity-100",
              )}
            />
            {onClose && (
              <div
                className="pointer-events-auto absolute right-1 top-1 z-20 rounded bg-black/20"
                onClick={onClose}
              >
                <AiOutlineClose />
              </div>
            )}
            <div className="pointer-events-auto flex flex-col pt-16">
              <div className="flex flex-col gap-2 px-4">
                <p className="line-clamp-2 w-full break-words text-[32px] font-semibold uppercase">
                  {campaign.name}
                </p>

                <p className="mt-2 w-full break-words text-sm font-light">{campaign.description}</p>

                <div className="mt-4 flex items-center gap-2">
                  <p className="text-sm font-medium">Created by:</p>
                  <div className="flex gap-2">
                    <Image
                      src={campaign.createdBy?.imageUrl || "/images/default-avatar.png"}
                      alt={campaign.createdBy?.username || ""}
                      width={20}
                      height={20}
                      className="shrink-0 rounded-full"
                    />
                    <span className="truncate text-sm font-light">
                      {campaign.createdBy?.username}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 h-0.5 w-full bg-black shadow-lobby" />
              <div className="flex flex-col gap-4 p-4">
                {campaign.dungeons.map((adventure) => (
                  <MobileAdventure
                    key={adventure._id}
                    adventure={adventure}
                    adventureDetailId={adventureDetailId}
                    closingId={closingId}
                    opening={opening}
                    setAdventureDetailId={setAdventureDetailId}
                    setOpening={setOpening}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileCampaignDetail;
