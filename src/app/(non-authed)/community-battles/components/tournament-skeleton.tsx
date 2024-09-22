/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React from "react";

import { cn } from "@/utils/style-utils";

/* eslint-disable tailwindcss/no-custom-classname */
const TournamentSkeleton = () => {
  return (
    <div className={cn("max-h-90 flex min-h-0 flex-col gap-2")}>
      <div className="min-h-0flex-row relative flex w-full justify-between p-2">
        <div className="mb-4 flex flex-col items-center rounded-t-md">
          {/* Skeleton for tournament name */}
          <div className="mb-4 h-10 w-48 rounded-lg bg-gray-600" />
          {/* Skeleton for season */}
          <div className="mb-4 h-8 w-32 rounded-lg bg-gray-600" />
          {/* Skeleton for start date */}
          <div className="mb-4 h-8 w-40 rounded-lg bg-gray-600" />
          {/* Skeleton for end date */}
          <div className="h-8 w-40 rounded-lg bg-gray-600" />
        </div>

        {/* Skeleton for CommunityTrack */}
        <div className="flex flex-col items-center rounded-t-md">
          <div className="h-48 w-full rounded-lg bg-gray-600" />
        </div>

        <div className="mt- relative flex flex-col items-center rounded-t-md">
          {/* Skeleton for prize title */}
          <div className="mb-4 h-10 w-64 rounded-lg bg-gray-600" />
          {/* Skeleton for prize value */}
          <div className="mt-4 h-16 w-48 rounded-lg bg-gray-600" />
        </div>
      </div>

      <div className="relative mt-3 flex h-full flex-row gap-4">
        <div className={cn("flex h-full max-h-screen min-h-screen w-1/4 flex-shrink-0 flex-col")}>
          {/* Skeleton for CommunityCarosel */}
          <div className="mb-4 h-64 w-full rounded-lg bg-gray-600" />
          {/* Skeleton for CommunityLeaderboard */}
          <div className="h-64 w-full rounded-lg bg-gray-600" />
        </div>

        <div className={cn("flex min-h-screen w-full flex-col")}>
          {/* Skeleton for TournamentLeaderboardList */}
          <div className="w-full rounded-lg bg-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default TournamentSkeleton;
