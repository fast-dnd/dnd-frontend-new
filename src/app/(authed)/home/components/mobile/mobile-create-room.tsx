"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/utils/style-utils";

import { tabStore } from "../../stores/tab-store";
import MobileAdventureDetail from "./mobile-adventure-detail";
import MobileAdventures from "./mobile-adventures";
import MobileCampaignDetail from "./mobile-campaign-detail";
import MobileCampaigns from "./mobile-campaigns";
import TabToggle from "./tab-toggle";

const MobileCreateRoom = ({
  adventureDetailId,
  setAdventureDetailId,
  campaignDetailId,
  setCampaignDetailId,
  closingAdventureId,
  closingCampaignId,
}: {
  adventureDetailId: string | undefined;
  setAdventureDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
  campaignDetailId: string | undefined;
  setCampaignDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
  closingAdventureId?: string | undefined;
  closingCampaignId?: string | undefined;
}) => {
  const [featuredOpened, setFeaturedOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const activeBaseTab = tabStore.baseTab.use();
  const [switching, setSwitching] = useState(false);
  return (
    <div className={cn("mt-16 flex flex-col")}>
      <TabToggle switching={switching} setSwitching={setSwitching} />
      <div
        className={cn(
          activeBaseTab !== "campaigns" && "h-0",
          !switching && activeBaseTab === "campaigns" && "static",
        )}
      >
        <AnimatePresence>
          {activeBaseTab === "campaigns" && (
            <motion.div
              layout={!campaignDetailId}
              initial={{ y: 285, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
              exit={{ y: 285, opacity: 0, transition: { duration: 0.5 } }}
              className={cn("absolute w-full", !switching && "static")}
            >
              <MobileCampaigns
                campaignDetailId={campaignDetailId}
                setCampaignDetailId={setCampaignDetailId}
                closingId={closingCampaignId}
                animate={activeBaseTab === "campaigns"}
              />
              <MobileCampaignDetail
                campaignDetailId={campaignDetailId}
                adventureDetailId={adventureDetailId}
                closingId={closingAdventureId}
                setAdventureDetailId={setAdventureDetailId}
              />
              <MobileAdventureDetail adventureDetailId={adventureDetailId} />
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 z-10 bg-dark-900 opacity-0 transition-all duration-500",
                  campaignDetailId && "pointer-events-auto opacity-100",
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeBaseTab === "adventures" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("flex flex-col")}
          >
            <MobileAdventures
              featured
              closingId={closingAdventureId}
              adventureDetailId={adventureDetailId}
              setAdventureDetailId={setAdventureDetailId}
              featuredOpened={featuredOpened}
              setFeaturedOpened={setFeaturedOpened}
              opening={opening}
              setOpening={setOpening}
              animate={activeBaseTab === "adventures"}
            />
            <div className="h-0.5 w-full bg-black shadow-lobby" />
            <MobileAdventures
              closingId={closingAdventureId}
              adventureDetailId={adventureDetailId}
              setAdventureDetailId={setAdventureDetailId}
              featuredOpened={featuredOpened}
              setFeaturedOpened={setFeaturedOpened}
              opening={opening}
              setOpening={setOpening}
              animate={activeBaseTab === "adventures"}
            />
            <MobileAdventureDetail adventureDetailId={adventureDetailId} />
            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-10 bg-dark-900 opacity-0 transition-all duration-500",
                adventureDetailId && "pointer-events-auto opacity-100",
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileCreateRoom;
