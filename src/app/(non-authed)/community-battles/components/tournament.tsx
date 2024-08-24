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
      <h1>{name}</h1>
      <h2>Season {season}</h2>
      <div className="overflow-y-auto overscroll-auto bg-black/20">
        <table className="w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Community</th>
              <th className="px-4 py-2 text-center">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community: any) => (
              <tr
                key={community._id}
                className={cn("cursor-pointer", {
                  "bg-gray-500": selectedCommunity?._id === community._id, // Highlight if selected
                  "bg-gray-700": selectedCommunity?._id !== community._id,
                })}
                onClick={() => handleSelectCommunity(community)}
              >
                <td className="px-4 py-2">
                  <img
                    src={community.logoImageUrl}
                    alt={community.name}
                    className="mr-2 inline-block h-8 w-8"
                  />
                  {community.name}
                </td>
                <td className="px-4 py-2 text-center">{community.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <Box
        wrapperClassName="lg:flex flex-1 hidden min-h-screen w-full max-w-none flex-1 flex-col self-center pb-12"
        title={`${selectedCommunity ? selectedCommunity.name : ""} RANKINGS`}
        className="flex h-full min-h-screen w-full flex-1 p-8"
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
