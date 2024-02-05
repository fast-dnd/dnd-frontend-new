"use client";

import { useState } from "react";

import Adventures from "@/components/common/adventures";
import CampaignDetail from "@/components/common/campaign-detail";
import Campaigns from "@/components/common/campaigns";
import DungeonDetail from "@/components/common/dungeon-detail";
import GameHistory from "@/components/common/game-history";
import GoBackButton from "@/components/common/go-back-button";
import Rewards from "@/components/common/rewards";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import Tabs from "./tabs";
import { Tab } from "./types/tab";

const MyCollection = ({ activeTab }: { activeTab: Tab }) => {
  const [dungeonDetailId, setDungeonDetailId] = useState<string>();
  const [campaignDetailId, setCampaignDetailId] = useState<string>();

  return (
    <Box
      title="MY COLLECTION"
      wrapperClassName="w-2/3"
      className={cn("flex min-h-0 w-full flex-1 flex-col gap-8 lg:p-8")}
    >
      {!!dungeonDetailId && (
        <>
          <GoBackButton onClick={() => setDungeonDetailId(undefined)} />
          <DungeonDetail dungeonDetailId={dungeonDetailId} isOwned />
          <div className="flex justify-end">
            <Button
              className="w-fit whitespace-nowrap"
              href={`/create-adventure/${dungeonDetailId}`}
            >
              EDIT ADVENTURE
            </Button>
          </div>
        </>
      )}
      {!!campaignDetailId && (
        <>
          <GoBackButton onClick={() => setCampaignDetailId(undefined)} />
          <CampaignDetail campaignDetailId={campaignDetailId} />
          <div className="flex justify-end">
            <Button
              className="w-fit whitespace-nowrap"
              href={`/create-campaign/${campaignDetailId}`}
            >
              EDIT CAMPAIGN
            </Button>
          </div>
        </>
      )}
      {!dungeonDetailId && !campaignDetailId && (
        <>
          <Tabs activeTab={activeTab} />

          {activeTab === "ADVENTURES" && (
            <Adventures setDungeonDetailId={setDungeonDetailId} isOwned showActions />
          )}
          {activeTab === "CAMPAIGNS" && (
            <Campaigns setCampaignDetailId={setCampaignDetailId} isOwned showActions />
          )}
          {activeTab === "GAME HISTORY" && <GameHistory showFull />}
          {activeTab === "REWARDS" && <Rewards />}
        </>
      )}
    </Box>
  );
};

export default MyCollection;
