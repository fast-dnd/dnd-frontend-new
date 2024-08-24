/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import router from "next/router";

import MobileNavbar from "@/components/navbar/mobile-navbar";
import { Box } from "@/components/ui/box";

import useGetTournament from "../hooks/use-get-tournament";
import CommunityCarosel from "./community-carosel";
import CommunityLeaderboard from "./community-leaderboard";
import CommunityTrack from "./community-track";
import TournamentLeaderboardList from "./tournament-leaderboard-list";

const Tournament = () => {
  const { data, isLoading, error } = useGetTournament();
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);

  useEffect(() => {
    if (data && data.communities.length > 0) {
      setSelectedCommunity(data.communities[0]); // Automatically select the first community
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="mb-4 flex flex-col items-center rounded-t-md py-6">
        <h1 className="text-4xl font-bold tracking-wide text-white">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 flex flex-col items-center rounded-t-md py-6">
        <h1 className="text-4xl font-bold tracking-wide text-white">
          Error loading tournament data
        </h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mb-4 flex flex-col items-center rounded-t-md py-6">
        <h1 className="text-4xl font-bold tracking-wide text-white">No data found </h1>
      </div>
    );
  }

  const { name, season, startDate, endDate, prize, prizeToken, communities } = data;

  const handleSelectCommunity = (community: any) => {
    setSelectedCommunity(community);
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div className="relative flex w-full  flex-row justify-between bg-white/5 p-8">
        <div className="mb-4 flex flex-col items-center rounded-t-md p-6">
          <h1 className="mb-4 text-4xl font-bold tracking-wide text-gold">{name}</h1>
          <h2 className="mb-4 text-2xl font-semibold">Season {season}</h2>
          <h2 className="text-2xl font-semibold">Starts: {formatDate(startDate)}</h2>
          <h2 className="text-2xl font-semibold">Ends: {formatDate(endDate)}</h2>
        </div>
        <CommunityTrack
          communities={communities}
          selectedCommunity={selectedCommunity}
          handleSelectCommunity={handleSelectCommunity}
        />
        <div className="relative mt-2 flex flex-col items-center rounded-t-md p-6">
          <h1 className="mb-4 text-4xl font-semibold text-gold">{`Ultimate battle prize`}</h1>
          <h1 className="mt-4 text-6xl font-semibold">{`${prize} ${prizeToken}`}</h1>
        </div>
      </div>
      <div className="relative flex flex-row gap-4">
        <div className="h-full w-1/4 flex-shrink-0">
          <div className="mb-4 flex flex-1 flex-col">
            <CommunityCarosel selectedCommunity={selectedCommunity} />
          </div>
          <div className="flex flex-1 flex-col">
            <CommunityLeaderboard communities={communities} />
          </div>
        </div>
        <Box
          wrapperClassName="lg:flex flex-col"
          title={"LEADERBOARD"}
          className="flex min-h-screen flex-1"
        >
          <div className="flex h-full w-full flex-col">
            <TournamentLeaderboardList
              communityId={selectedCommunity ? selectedCommunity._id : ""}
            />
          </div>
        </Box>
      </div>
      <div className="flex h-full min-h-0 flex-col lg:hidden">
        <MobileNavbar onClickBack={() => router.push("/home")} />
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <TournamentLeaderboardList communityId={selectedCommunity ? selectedCommunity._id : ""} />
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options); // undefined means it will use the user's locale
};

export default Tournament;
