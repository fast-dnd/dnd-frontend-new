"use client";

import { useState } from "react";

import Adventures from "@/components/adventures";
import CampaignDetail from "@/components/campaign-detail";
import Campaigns from "@/components/campaigns";
import DungeonDetail from "@/components/dungeon-detail";
import GoBackButton from "@/components/go-back-button";
import Rewards from "@/components/rewards";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import GameHistory from "./game-history";
import Tabs from "./tabs";
import { Tab } from "./types/tab";

const MyCollection = ({ activeTab }: { activeTab: Tab }) => {
  const [dungeonDetailId, setDungeonDetailId] = useState<string>();
  const [campaignDetailId, setCampaignDetailId] = useState<string>();

  return (
    <Box
      title="MY COLLECTION"
      wrapperClassName="flex basis-2/3"
      className={cn("flex min-h-0 flex-1 flex-col gap-8 lg:p-8")}
    >
      {!!dungeonDetailId && (
        <>
          <GoBackButton onClick={() => setDungeonDetailId(undefined)} />
          <DungeonDetail dungeonDetailId={dungeonDetailId} />
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
          {activeTab === "GAME HISTORY" && <GameHistory />}
          {activeTab === "REWARDS" && <Rewards />}
        </>
      )}
    </Box>
  );
};

export default MyCollection;
