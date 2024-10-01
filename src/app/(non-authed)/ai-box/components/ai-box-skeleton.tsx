/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React from "react";

import { cn } from "@/utils/style-utils";

/* eslint-disable tailwindcss/no-custom-classname */
const AiBoxSkeleton = () => {
  return (
    <div className={cn("flex min-h-0 w-full flex-1 flex-col gap-8 overflow-hidden p-4 lg:p-8")}>
      <div className="relative flex w-full flex-row justify-between gap-2 p-2">
        {/* Left Section - Query and Text Area Skeleton */}
        <div className="mb-4 flex w-1/2 flex-col items-center justify-center rounded-t-md p-4 shadow-lg backdrop-blur-lg">
          <div className="mb-4 h-8 w-32 rounded-lg bg-gray-600" /> {/* Skeleton for Query title */}
          <div className="mb-8 h-6 w-64 rounded-lg bg-gray-600" />{" "}
          {/* Skeleton for Query content */}
          <div className="h-32 w-full rounded-lg bg-gray-600" /> {/* Skeleton for Text Area */}
        </div>

        {/* Middle Section - "How It Works" Skeleton */}
        <div className="flex flex-1 flex-col gap-4 rounded-lg p-4 shadow-md">
          <div className="mb-4 h-8 w-48 rounded-lg bg-gray-600" /> {/* Skeleton for Title */}
          <div className="mb-2 h-4 w-72 rounded-lg bg-gray-600" /> {/* Skeleton for Step 1 */}
          <div className="mb-2 h-4 w-72 rounded-lg bg-gray-600" /> {/* Skeleton for Step 2 */}
          <div className="h-4 w-72 rounded-lg bg-gray-600" /> {/* Skeleton for Step 3 */}
        </div>

        {/* Right Section - Prize Information Skeleton */}
        <div style={{ height: "80%" }} className={cn("flex flex-col items-center gap-4 p-4")}>
          <div className="h-40 w-32 rounded-lg bg-gray-600" /> {/* Skeleton for Image */}
          <div className="mt-4 h-8 w-48 rounded-lg bg-gray-600" /> {/* Skeleton for Prize Title */}
          <div className="mt-4 h-16 w-48 rounded-lg bg-gray-600" /> {/* Skeleton for Prize Value */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-6 w-32 rounded-lg bg-gray-600" /> {/* Skeleton for Powered by Text */}
            <div className="h-8 w-8 rounded-full bg-gray-600" /> {/* Skeleton for Ora Logo */}
          </div>
        </div>
      </div>

      {/* Bottom Section - Leaderboard List Skeleton */}
      <div className="w-full">
        <div className="h-64 w-full rounded-lg bg-gray-600" /> {/* Skeleton for Leaderboard */}
      </div>
    </div>
  );
};

export default AiBoxSkeleton;
