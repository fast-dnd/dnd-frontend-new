"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MobileNavbar from "@/components/navbar/mobile-navbar";
import { Box } from "@/components/ui/box";

import LeaderboardList from "./components/leaderboard-list";
import Tabs from "./components/tabs";
import { RatingType } from "./types/rating-type";

const Leaderboard = () => {
  const router = useRouter();

  const [selectedRating, setSelectedRating] = useState<RatingType>("gameplay");

  return (
    <>
      <Box
        wrapperClassName="lg:flex flex-1 hidden min-h-0 w-[1200px] max-w-7xl flex-1 flex-col self-center pb-12"
        title="LEADERBOARD"
        className="flex min-h-0 flex-1 p-8"
      >
        <div className="flex w-full flex-col">
          <Tabs selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
          <LeaderboardList selectedRating={selectedRating} />
        </div>
      </Box>

      <div className="flex h-full min-h-0 flex-col lg:hidden">
        <MobileNavbar onClickBack={() => router.push("/home")} />
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <Tabs selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
          <LeaderboardList selectedRating={selectedRating} />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
