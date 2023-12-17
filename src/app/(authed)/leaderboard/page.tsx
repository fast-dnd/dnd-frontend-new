"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MobileNavbar from "@/components/navbar/mobile-navbar";
import { Box } from "@/components/ui/box";

import LeaderboardList from "./components/leaderboard-list";
import Tabs from "./components/tabs";
import { LeaderboardMetricsType } from "./types/rating-type";

const Leaderboard = () => {
  const router = useRouter();

  const [selectedLeaderboardMetric, setSelectedLeaderboardMetric] =
    useState<LeaderboardMetricsType>("gameplay");

  return (
    <>
      <Box
        wrapperClassName="lg:flex flex-1 hidden min-h-0 w-[1200px] max-w-7xl flex-1 flex-col self-center pb-12"
        title="LEADERBOARD"
        className="flex min-h-0 flex-1 p-8"
      >
        <div className="flex w-full flex-col">
          <Tabs
            selectedLeaderboardMetric={selectedLeaderboardMetric}
            setSelectedLeaderboardMetric={setSelectedLeaderboardMetric}
          />
          <LeaderboardList selectedLeaderboardMetric={selectedLeaderboardMetric} />
        </div>
      </Box>

      <div className="flex h-full min-h-0 flex-col lg:hidden">
        <MobileNavbar onClickBack={() => router.push("/home")} />
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <Tabs
            selectedLeaderboardMetric={selectedLeaderboardMetric}
            setSelectedLeaderboardMetric={setSelectedLeaderboardMetric}
          />
          <LeaderboardList selectedLeaderboardMetric={selectedLeaderboardMetric} />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
