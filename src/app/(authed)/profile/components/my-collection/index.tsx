"use client";

import { useState } from "react";

import { cn } from "@/utils/style-utils";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import GoBackButton from "@/components/go-back-button";

import Adventures from "./adventures";
import Campaigns from "./campaigns";
import DungeonDetail from "./dungeon-detail";
import GameHistory from "./game-history";
import Rewards from "./rewards";
import Tabs from "./tabs";
import { Tab } from "./types/tab";

const MyCollection = ({ activeTab }: { activeTab: Tab }) => {
  const [dungeonDetailId, setDungeonDetailId] = useState<string>();

  return (
    <Box
      title="MY COLLECTION"
      wrapperClassName="flex basis-2/3"
      className={cn("flex min-h-0 flex-1 flex-col lg:p-8")}
    >
      {dungeonDetailId ? (
        <>
          <GoBackButton onClick={() => setDungeonDetailId(undefined)} />
          <DungeonDetail dungeonDetailId={dungeonDetailId} />
          <div className="absolute bottom-8 right-8 flex items-center gap-8">
            <Button
              className="w-fit whitespace-nowrap"
              href={`/create-adventure/${dungeonDetailId}`}
            >
              EDIT ADVENTURE
            </Button>
          </div>
        </>
      ) : (
        <>
          <Tabs activeTab={activeTab} />

          {activeTab === "ADVENTURES" && <Adventures setDungeonDetailId={setDungeonDetailId} />}
          {activeTab === "CAMPAIGNS" && <Campaigns />}
          {activeTab === "GAME HISTORY" && <GameHistory />}
          {activeTab === "REWARDS" && <Rewards />}
        </>
      )}
    </Box>
  );
};

export default MyCollection;
