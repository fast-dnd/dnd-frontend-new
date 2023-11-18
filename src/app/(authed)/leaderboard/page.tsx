"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MobileNavbar from "@/components/mobile-navbar";
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
        wrapperClassName="lg:flex hidden min-h-0 w-[1200px] max-w-7xl flex-1 flex-col self-center pb-12"
        title="LEADERBOARD"
        className="flex-1 py-8"
      >
        <div className="mx-auto flex w-4/5 flex-col">
          <Tabs selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
          <LeaderboardList selectedRating={selectedRating} />
        </div>
      </Box>

      <div className="flex flex-1 flex-col lg:hidden">
        <MobileNavbar onClickBack={() => router.push("/home")} />
        <div className="relative flex flex-1 flex-col p-4">
          <Tabs selectedRating={selectedRating} setSelectedRating={setSelectedRating} />

          <LeaderboardList selectedRating={selectedRating} />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
