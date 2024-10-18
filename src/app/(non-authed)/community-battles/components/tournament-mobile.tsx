/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react";

import Spinner from "@/components/ui/spinner"; // Importing Spinner component
import { jibril } from "@/utils/fonts";

import useGetTournament from "../hooks/use-get-tournament";
import CommunityLeaderboard from "./community-leaderboard";
import CommunityTrack from "./community-track";
import TournamentLeaderboardList from "./tournament-leaderboard-list";

const TournamentMobile = () => {
  const { data, isLoading, error } = useGetTournament();
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const [lastRefetch, setLastRefetch] = useState<number>(1);
  const [isArrowSpinning, setIsArrowSpinning] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1); // State to manage active tab

  const handleArrowSpinning = () => {
    setIsArrowSpinning(true);
    setTimeout(() => {
      setIsArrowSpinning(false);
      setLastRefetch(Date.now());
    }, 3000);
  };

  useEffect(() => {
    if (data && data.communities.length > 0) {
      setSelectedCommunity(data.communities[0]);
    }
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-bold text-white">Error loading tournament data</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-bold text-white">No data found</h1>
      </div>
    );
  }

  const { name, season, startDate, endDate, prize, prizeToken, communities } = data;

  const handleSelectCommunity = (community: any) => {
    setSelectedCommunity(community);
  };

  return (
    <div className="mt-10 flex w-full flex-col p-4">
      {/* Tab Navigation */}
      <div className="mb-4 flex justify-between">
        <button
          className={`flex-1 p-2 ${activeTab === 1 ? "bg-red-400 text-black" : " text-white"}`}
          onClick={() => setActiveTab(1)}
        >
          Tournament Info
        </button>
        <button
          className={`flex-1 p-2 ${activeTab === 2 ? "bg-red-400 text-black" : " text-white"}`}
          onClick={() => setActiveTab(2)}
        >
          Communities
        </button>

        <button
          className={`flex-1 p-2 ${activeTab === 3 ? "bg-red-400 text-black" : " text-white"}`}
          onClick={() => setActiveTab(3)}
        >
          Leaderboard
        </button>
      </div>

      {activeTab === 1 && (
        <div className="flex flex-col items-center space-y-6 rounded-lg  p-6 shadow-lg">
          <h1 className="text-4xl font-bold text-red-400" style={jibril.style}>
            {name}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-300">Season {season}</h2>
          <p className="text-sm text-gray-400">
            Starts: {formatDate(startDate)} <br />
            Ends: {formatDate(endDate)}
          </p>

          {/* Prize Section */}
          <div className="mt-6 w-full space-y-4 rounded-lg bg-gray-900 p-6 text-center shadow-md">
            <h1 className="text-2xl font-semibold text-red-400" style={jibril.style}>
              Ultimate Battle Prize
            </h1>
            <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
              {`${prize} ${prizeToken}`}
            </h1>
            <a
              href="https://www.ora.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2"
            >
              <h1 className="text-sm font-bold text-gray-300">Powered by ORA Protocol</h1>
              <img
                src="/images/logos/ora-logo.png"
                alt="ORA Logo"
                className="h-8 w-8 object-contain"
              />
            </a>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="flex flex-col items-center space-y-4">
          <CommunityLeaderboard communities={communities} />
        </div>
      )}

      {activeTab === 3 && (
        <div>
          <CommunityTrack
            communities={communities}
            selectedCommunity={selectedCommunity}
            handleSelectCommunity={handleSelectCommunity}
          />
          <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-white">
              It can take up to <strong className="text-red-400">2 minutes</strong> for the AI to
              rate your query. Please <strong className="text-red-400">refresh the page</strong> to
              see the result.
            </p>
            {/* Refresh Info */}
            <div className="flex items-center space-x-3">
              {isArrowSpinning ? (
                <Spinner className="m-0 size-5 opacity-100" style={{ cursor: "pointer" }} />
              ) : (
                <ArrowClockwise
                  className="cursor-pointer opacity-100"
                  size={24}
                  onClick={handleArrowSpinning}
                />
              )}
            </div>
          </div>
          <div className="mt-2">
            <TournamentLeaderboardList
              lastRefetch={lastRefetch}
              communityId={selectedCommunity ? selectedCommunity._id : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export default TournamentMobile;
