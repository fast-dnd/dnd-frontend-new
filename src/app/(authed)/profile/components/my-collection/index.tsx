"use client";

import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

import { cn } from "@/utils/style-utils";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import Adventures from "./adventures";
import Campaigns from "./campaigns";
import DungeonDetail from "./dungeon-detail";
import GameHistory from "./game-history";
import Rewards from "./rewards";
import Tabs from "./tabs";
import { Tab } from "./types/tab";

const MyCollection = ({ activeTab }: { activeTab: Tab }) => {
  const [dungeonDetailId, setDungeonDetailId] = useState<string | null>(null);

  return (
    <Box
      title="MY COLLECTION"
      wrapperClassName="flex basis-2/3 pb-12"
      className={cn("h-full p-8", dungeonDetailId && "rounded-t-md")}
      titleClassName={dungeonDetailId ? "hidden" : "flex"}
    >
      {dungeonDetailId ? (
        <>
          <DungeonDetail dungeonDetailId={dungeonDetailId} />
          <div className="absolute bottom-8 right-8 flex items-center gap-8">
            <div
              className="cursor-pointer items-center gap-1 uppercase"
              onClick={() => setDungeonDetailId(null)}
            >
              <AiOutlineLeft className="inline-block" /> GO BACK
            </div>
            <Button className="w-fit whitespace-nowrap">EDIT ADVENTURE</Button>
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
