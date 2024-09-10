/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { jibril } from "@/utils/fonts";

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
    <div className="relative flex flex-col gap-4 ">
      <div className="relative flex w-full  flex-row justify-between p-8">
        <div className="mb-4 flex flex-col items-center rounded-t-md ">
          <h1 className="mb-4 text-4xl font-bold tracking-wide text-gold" style={jibril.style}>
            {name}
          </h1>
          <h2 className="mb-4 text-2xl font-semibold">Season {season}</h2>
          <h2 className="text-2xl font-semibold">Starts: {formatDate(startDate)}</h2>
          <h2 className="text-2xl font-semibold">Ends: {formatDate(endDate)}</h2>
        </div>
        <CommunityTrack
          communities={communities}
          selectedCommunity={selectedCommunity}
          handleSelectCommunity={handleSelectCommunity}
        />
        <div className="relative mt-2 flex flex-col items-center rounded-t-md ">
          <h1
            className="mb-4 text-4xl font-semibold text-gold"
            style={jibril.style}
          >{`Ultimate battle prize`}</h1>
          <h1 className="mt-4 text-6xl font-semibold">{`${prize} ${prizeToken}`}</h1>
        </div>
      </div>
      <div className="relative flex h-full flex-row gap-4">
        <div className="flex h-full w-1/4 flex-shrink-0 flex-col ">
          <div className="mb-4 ">
            <CommunityCarosel selectedCommunity={selectedCommunity} />
          </div>
          <div className="">
            <CommunityLeaderboard communities={communities} />
          </div>
        </div>
        <div className="flex h-full w-full flex-col">
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
