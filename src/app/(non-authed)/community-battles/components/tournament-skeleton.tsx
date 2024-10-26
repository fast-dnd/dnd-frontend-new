/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React from "react";

/* eslint-disable tailwindcss/no-custom-classname */
const TournamentSkeleton = () => {
  return (
    <div className="relative w-full p-6">
      {/* Glowing border effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-b to-transparent" /> */}
      <div className="relative z-10 mx-auto max-w-7xl rounded-xl bg-gray-900/80 p-8 backdrop-blur-xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-center">
          {/* Skeleton for tournament title */}
          <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-600"></div>
          {/* Refresh button skeleton */}
          <div className="absolute right-8 flex items-center space-x-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - How it Works Section */}
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-800/50 p-6">
              {/* Skeleton for "How it Works?" title */}
              <div className="mx-auto mb-4 h-8 w-48 animate-pulse rounded-lg bg-gray-600"></div>

              {/* Community Track Section Skeleton */}
              <div className="mb-6">
                <div className="mx-auto mb-2 h-6 w-64 animate-pulse rounded-lg bg-gray-600"></div>
                <div className="h-24 w-full animate-pulse rounded-lg bg-gray-600"></div>
              </div>

              {/* Start and End Dates Section Skeleton */}
              <div className="mb-6 rounded-lg border-4 border-blue-200 bg-gray-800/50 p-4 shadow-md">
                <div className="mx-auto mb-2 h-6 w-64 animate-pulse rounded-lg bg-gray-600"></div>
                <div className="mx-auto h-6 w-48 animate-pulse rounded-lg bg-gray-600"></div>
                <div className="mx-auto mt-2 h-6 w-48 animate-pulse rounded-lg bg-gray-600"></div>
              </div>

              {/* Ultimate Battle Prize Section Skeleton */}
              <div className="relative mb-6 flex flex-col items-center justify-center rounded-lg border-4 border-blue-200 bg-gray-800/50 p-4 shadow-md">
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg border-4 border-double border-blue-300 opacity-70"
                  style={{ transform: "rotate(-2deg)" }}
                ></div>
                <div className="mb-2 h-6 w-64 animate-pulse rounded-lg bg-gray-600"></div>
                <div className="h-12 w-48 animate-pulse rounded-lg bg-gray-600"></div>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="h-6 w-40 animate-pulse rounded-lg bg-gray-600"></div>
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600"></div>
                </div>
              </div>

              {/* How To Get Points List Section Skeleton */}
              <div className="rounded-lg bg-gray-800/50 p-6">
                <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded-lg bg-gray-600"></div>
                <div className="mb-2 h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                <ul className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 h-6 w-6 animate-pulse rounded-full bg-gray-600"></div>
                      <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Community Carousel, Leaderboard, and Player Rating */}
          <div className="space-y-6">
            {/* Community Carousel Skeleton */}
            <div className="rounded-lg bg-gray-800/50 p-6">
              <div className="h-48 w-full animate-pulse rounded-lg bg-gray-600"></div>
            </div>

            {/* Community Leaderboard Skeleton */}
            <div className="rounded-lg bg-gray-800/50 p-6">
              <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded-lg bg-gray-600"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-6 w-full animate-pulse rounded-lg bg-gray-600"
                  ></div>
                ))}
              </div>
            </div>

            {/* Player Ratings Skeleton */}
            <div className="rounded-lg bg-gray-800/50 p-6">
              <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded-lg bg-gray-600"></div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border-b border-gray-600 px-4 py-2">
                      <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2">
                      <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2">
                      <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(3)].map((_, index) => (
                    <tr key={index}>
                      <td className="border-b border-gray-700 px-4 py-2">
                        <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                      </td>
                      <td className="border-b border-gray-700 px-4 py-2">
                        <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                      </td>
                      <td className="border-b border-gray-700 px-4 py-2">
                        <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="mt-8">
          <div className="rounded-lg bg-gray-800/50 p-6">
            {/* Skeleton for TournamentLeaderboardList */}
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-6 w-full animate-pulse rounded-lg bg-gray-600"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentSkeleton;
