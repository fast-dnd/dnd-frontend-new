"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Adventures from "@/components/common/adventures";
import CampaignDetail from "@/components/common/campaign-detail";
import Campaigns from "@/components/common/campaigns";
import DungeonDetail from "@/components/common/dungeon-detail";
import GoBackButton from "@/components/common/go-back-button";
import { Box } from "@/components/ui/box";
import { Tooltip } from "@/components/ui/tooltip";
import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";

import { tabStore } from "../../../stores/tab-store";
import CommunityInfo from "../../community-info";
import AddFavoriteFooter from "./add-favorite-footer";
import CreateRoomFooter from "./create-room-footer";
import Tabs from "./tabs";

const CreateRoom = () => {
  const { isDefault } = useCommunity();

  const { loggedIn, user } = useAuth();

  const subTab = tabStore.subTab.use();

  const activeBaseTab = tabStore.baseTab.use();

  const [searchName, setSearchName] = useState<string>();

  const [dungeonDetailId, setDungeonDetailId] = useState<string>();
  const [campaignDetailId, setCampaignDetailId] = useState<string>();

  const isCampaignsLocked = (user?.account?.level ?? 0) <= 1;

  const onGoBack = () => {
    if (dungeonDetailId && campaignDetailId) setDungeonDetailId(undefined);
    else if (dungeonDetailId) setDungeonDetailId(undefined);
    else if (campaignDetailId) setCampaignDetailId(undefined);
  };

  return (
    <Box
      title="CHOOSE ADVENTURE"
      className="flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto p-4 lg:p-8"
      wrapperClassName="w-3/4 min-w-0"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg bg-primary-600/20 p-4"
      >
        <p className="font-medium text-primary-400">
          👋 Welcome! Start your journey by selecting adventure below
        </p>
      </motion.div>
      {loggedIn && !isDefault && <CommunityInfo />}
      {dungeonDetailId || campaignDetailId ? (
        <GoBackButton onClick={onGoBack} />
      ) : (
        <Tabs setSearchName={setSearchName} />
      )}
      {dungeonDetailId ? (
        <>
          <DungeonDetail dungeonDetailId={dungeonDetailId} addFavorite />
          <CreateRoomFooter dungeonDetailId={dungeonDetailId} />
        </>
      ) : campaignDetailId ? (
        <CampaignDetail
          campaignDetailId={campaignDetailId}
          setDungeonDetailId={setDungeonDetailId}
          addFavorite
        />
      ) : (
        <>
          {activeBaseTab === "adventures" && (
            <Adventures
              filter={subTab}
              setDungeonDetailId={setDungeonDetailId}
              isOwned={subTab === "owned"}
              searchName={searchName}
              addFavorite
            />
          )}
          {activeBaseTab === "campaigns" && (
            <Tooltip
              content="Campaigns are unlocked after completing your first adventure!"
              contentClassName="p-4 w-[270px] whitespace-normal"
              disabled={!isCampaignsLocked}
            >
              <div className={isCampaignsLocked ? "pointer-events-none opacity-50" : ""}>
                <Campaigns
                  filter={subTab}
                  setCampaignDetailId={setCampaignDetailId}
                  isOwned={subTab === "owned"}
                  searchName={searchName}
                  addFavorite
                />
              </div>
            </Tooltip>
          )}
          {subTab === "favourite" && <AddFavoriteFooter />}
        </>
      )}
    </Box>
  );
};

export default CreateRoom;
