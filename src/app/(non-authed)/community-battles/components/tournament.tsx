/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import router from "next/router";

import MobileNavbar from "@/components/navbar/mobile-navbar";
import { Box } from "@/components/ui/box";
import { cn } from "@/utils/style-utils";

import useGetTournament from "../hooks/use-get-tournament";
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tournament data.</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  const { name, season, communities } = data;

  const handleSelectCommunity = (community: any) => {
    setSelectedCommunity(community);
  };

  return (
    <div className="relative flex flex-col">
      <div className="mb-4 flex flex-col items-center rounded-t-md bg-dark-900 py-6">
        <h1 className="text-2xl font-bold tracking-wide text-white">{name}</h1>
        <h2 className="text-lg font-semibold text-gray-400">Season {season}</h2>
      </div>
      <div className="flex w-full flex-col">
        <div className="relative flex items-center justify-center gap-4 rounded-t-md bg-dark-900 px-4 py-6"></div>
        <div className="overflow-y-auto overscroll-auto bg-dark-800">
          <table className="w-full bg-dark-900 text-white">
            <thead>
              <tr className="border-b border-white/50">
                <th className="px-6 py-4 text-left text-lg">Community</th>
                <th className="px-6 py-4 text-center text-lg">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {communities.map((community: any) => (
                <tr
                  key={community._id}
                  className={cn("cursor-pointer", {
                    "bg-blue-800": selectedCommunity?._id === community._id, // Highlight if selected
                    "bg-gray-900": selectedCommunity?._id !== community._id,
                  })}
                  onClick={() => handleSelectCommunity(community)}
                >
                  <td className="flex items-center px-6 py-4 text-lg">
                    <img
                      src={community.logoImageUrl}
                      alt={community.name}
                      className="mr-4 inline-block h-12 w-12"
                    />
                    {community.name}
                  </td>
                  <td className="px-6 py-4 text-center text-lg">{community.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <Box
        wrapperClassName="lg:flex flex-1 hidden min-h-screen w-full max-w-none flex-1 flex-col self-center pb-12"
        title={`${selectedCommunity ? selectedCommunity.name : ""} RANKINGS`}
        className="flex  min-h-screen w-full flex-1"
      >
        <div className="flex h-full w-full flex-col">
          <TournamentLeaderboardList communityId={selectedCommunity ? selectedCommunity._id : ""} />
        </div>
      </Box>
      <div className="flex h-full min-h-0 flex-col lg:hidden">
        <MobileNavbar onClickBack={() => router.push("/home")} />
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <TournamentLeaderboardList communityId={selectedCommunity ? selectedCommunity._id : ""} />
        </div>
      </div>
    </div>
  );
};

export default Tournament;
