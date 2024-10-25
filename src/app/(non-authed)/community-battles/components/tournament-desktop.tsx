/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react";

// import Spinner from "@/components/ui/spinner"; // Importing Spinner component
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import useGetTournament from "../hooks/use-get-tournament";
import CommunityCarosel from "./community-carosel";
import CommunityLeaderboard from "./community-leaderboard";
import CommunityTrack from "./community-track";
import TournamentLeaderboardList from "./tournament-leaderboard-list";
import TournamentSkeleton from "./tournament-skeleton";

const TournamentDesktop = () => {
  const { data, isLoading, error, refetch, isFetching } = useGetTournament();
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const [lastRefetch, setLastRefetch] = useState<number>(1);

  useEffect(() => {
    if (data && data.communities.length > 0) {
      setSelectedCommunity(data.communities[0]); // Automatically select the first community
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [lastRefetch]);

  if (isLoading) {
    return <TournamentSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="rounded-lg bg-gray-900/60 p-8 text-center backdrop-blur-lg">
          <h1 className="text-2xl font-bold text-red-400">
            {error ? "Error loading tournament data" : "No data found"}
          </h1>
        </div>
      </div>
    );
  }

  const { name, season, startDate, endDate, prize, prizeToken, communities } = data;

  const handleSelectCommunity = (community: any) => {
    setSelectedCommunity(community);
  };

  return (
    <div className="relative w-full p-6">
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-b to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl rounded-xl bg-gray-900/80 p-8 backdrop-blur-xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-center">
          <h1
            className="text-center text-4xl font-bold tracking-wider text-yellow-400"
            style={jibril.style}
          >
            {name} - Season {season} ⚔️
          </h1>
          <div className="absolute right-8 flex items-center space-x-4">
            <button
              onClick={() => setLastRefetch(Date.now())}
              className="rounded-full bg-gray-800 p-2 transition-all hover:bg-gray-700"
            >
              {isFetching ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
              ) : (
                <ArrowClockwise className="h-6 w-6 text-red-400" />
              )}
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - How it Works Section */}
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-800/50 p-6">
              <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
                How it Works? 🤔
              </h2>

              {/* Community Track Section */}
              <div className="mb-6">
                <h3 className="mb-2 text-center text-xl font-semibold text-blue-400">
                  🌍 Communities that Participate 🌍
                </h3>
                <CommunityTrack
                  communities={communities}
                  selectedCommunity={selectedCommunity}
                  handleSelectCommunity={handleSelectCommunity}
                />
              </div>

              {/* Start and End Dates Section */}
              <div className="mb-6 rounded-lg border-4 border-green-500 bg-gray-700/50 p-4 shadow-lg">
                <h3 className="mb-2 text-center text-xl font-semibold text-green-300">
                  🏆 Tournament Dates 🏆
                </h3>
                <p className="text-lg font-bold italic text-green-200">
                  🚀 Starts: {formatDate(startDate)}
                </p>
                <p className="text-lg font-bold italic text-green-200">
                  🏁 Ends: {formatDate(endDate)}
                </p>
              </div>

              {/* Ultimate Battle Prize Section */}
              <div className="relative mb-6 rounded-lg border-4 border-green-500 bg-gray-700/50 p-4 shadow-lg">
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg border-4 border-double border-green-600 opacity-70"
                  style={{ transform: "rotate(-2deg)" }}
                ></div>
                <h3 className="mb-2 text-center text-xl font-semibold text-green-300">
                  🎁 Ultimate Battle Prize 🎁
                </h3>
                <p className="text-center text-5xl font-bold text-yellow-400">
                  {prize} {prizeToken} 💎
                </p>
                <div className="mt-4 inline-flex items-center justify-center space-x-2 rounded-full bg-red-400/10 px-4 py-2 text-red-400">
                  <a href="https://www.ora.io/" target="_blank" rel="noopener noreferrer">
                    <span>Powered by ORA Protocol</span>
                  </a>
                  <img
                    src="/images/logos/ora-logo.png"
                    alt="ora logo"
                    style={{ width: "30px", height: "30px", objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* How it Works List Section */}
              <div className="rounded-lg bg-gray-800/50 p-6">
                <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
                  How it Works 📝
                </h2>
                <p className="mb-2 space-y-3 text-gray-300">
                  Each day, try to post at least 1 transcript since it will count in the
                  leaderboard. 📈
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-red-400/20 px-2 py-1 text-sm text-red-400">
                      1
                    </span>
                    Play a full game and try to win 🎮
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-red-400/20 px-2 py-1 text-sm text-red-400">
                      2
                    </span>
                    When you win, in match history you will see a 💲 sign next to the game you
                    played. Click on that to pay for AI judge to process your transcript 🤖
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-red-400/20 px-2 py-1 text-sm text-red-400">
                      3
                    </span>
                    Get rated on your moves and climb the leaderboard 🚀
                  </li>
                </ul>
                <p className="mt-2 space-y-3 text-gray-300">
                  *Note: If the transaction is not processed in
                  <strong className="font-semibold text-red-400"> 5 minutes</strong>, ask on our
                  Discord for <strong className="font-semibold text-red-400">help</strong> or cancel
                  the request.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Community Carousel, Leaderboard, and Player Rating */}
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-800/50 p-6">
              <CommunityCarosel selectedCommunity={selectedCommunity} />
            </div>

            <div className="rounded-lg bg-gray-800/50 p-6">
              <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
                Community Leaderboard 🏅
              </h2>
              <CommunityLeaderboard communities={communities} />
            </div>

            {/* Player Rating Section */}
            <div className="rounded-lg bg-gray-800/50 p-6">
              <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
                Player Ratings 🌟
              </h2>
              <table className="w-full text-left text-gray-300">
                <thead>
                  <tr>
                    <th className="border-b border-gray-600 px-4 py-2">Player</th>
                    <th className="border-b border-gray-600 px-4 py-2">Rating</th>
                    <th className="border-b border-gray-600 px-4 py-2">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-700 px-4 py-2">Player 1</td>
                    <td className="border-b border-gray-700 px-4 py-2">1500</td>
                    <td className="border-b border-gray-700 px-4 py-2">1</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-700 px-4 py-2">Player 2</td>
                    <td className="border-b border-gray-700 px-4 py-2">1450</td>
                    <td className="border-b border-gray-700 px-4 py-2">2</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-700 px-4 py-2">Player 3</td>
                    <td className="border-b border-gray-700 px-4 py-2">1400</td>
                    <td className="border-b border-gray-700 px-4 py-2">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="mt-8">
          <div className="mb-4 flex justify-center space-x-2">
            {Array.from({ length: Math.min(data.season, 3) }, (_, index) => {
              const seasonValue = data.season - index;
              return (
                <button
                  key={seasonValue}
                  className={cn(
                    "rounded-lg px-4 py-2 font-medium transition-all",
                    selectedCommunity?.season === seasonValue
                      ? "bg-red-400 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700",
                  )}
                  onClick={() => setSelectedCommunity(communities[seasonValue - 1])}
                >
                  Season {seasonValue}
                </button>
              );
            })}
          </div>

          <div className="rounded-lg bg-gray-800/50 p-6">
            <TournamentLeaderboardList
              lastRefetch={lastRefetch}
              communityId={selectedCommunity ? selectedCommunity._id : ""}
            />
          </div>
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

export default TournamentDesktop;
