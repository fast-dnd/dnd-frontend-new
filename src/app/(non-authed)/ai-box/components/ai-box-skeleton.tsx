/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React from "react";

/* eslint-disable tailwindcss/no-custom-classname */
const AiBoxSkeleton = () => {
  return (
    <div className="relative w-full p-6">
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-b to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl rounded-xl bg-gray-900/80 p-8 backdrop-blur-xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-center">
          {/* Skeleton for AI Challenge Title */}
          <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-600"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Query and Input */}
          <div className="space-y-6">
            {/* Box Query Card Skeleton */}
            <div className="rounded-lg bg-gray-800/50 p-6">
              <div className="mx-auto mb-4 h-8 w-32 animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Title */}
              <div className="mb-4 h-6 w-full animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Query content */}
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="h-6 w-6 animate-pulse rounded-full bg-gray-600"></div>{" "}
                {/* Clock emoji */}
                <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-600"></div> {/* Timer */}
                <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-600"></div> {/* Day */}
              </div>
            </div>

            {/* Your Response Card Skeleton */}
            <div className="rounded-lg bg-gray-800/50 p-6">
              <div className="mx-auto mb-4 h-8 w-40 animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Title */}
              <div className="relative">
                <div className="h-32 w-full animate-pulse rounded-lg bg-gray-600"></div>{" "}
                {/* TextArea */}
                <div className="absolute bottom-4 right-2 h-4 w-16 animate-pulse rounded-lg bg-gray-600"></div>{" "}
                {/* Character count */}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="mt-2 h-6 w-48 animate-pulse rounded-lg bg-gray-600"></div>{" "}
                {/* Rating info */}
                <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-600"></div>{" "}
                {/* Submit button */}
              </div>
            </div>
          </div>

          {/* Right Column - Prize and Info */}
          <div className="space-y-6">
            {/* Today's Prize Card Skeleton */}
            <div className="rounded-lg bg-gray-800/50 p-6 text-center">
              <div className="mx-auto mb-4 h-8 w-40 animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Title */}
              <div className="mx-auto h-12 w-48 animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Prize amount */}
              <div className="mt-4 inline-flex items-center justify-center space-x-2">
                <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-600"></div>{" "}
                {/* Powered by text */}
                <div className="h-6 w-6 animate-pulse rounded-full bg-gray-600"></div>{" "}
                {/* Ora logo */}
              </div>
            </div>

            {/* How it Works Card Skeleton */}
            <div className="rounded-lg bg-gray-800/50 p-6">
              <div className="mx-auto mb-4 h-8 w-40 animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Title */}
              <div className="mb-2 h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Paragraph */}
              <ul className="space-y-3">
                {/* Step 1 */}
                <li className="flex items-start">
                  <div className="mr-2 h-6 w-6 animate-pulse rounded-full bg-gray-600"></div>{" "}
                  {/* Step number */}
                  <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>{" "}
                  {/* Step description */}
                </li>
                {/* Step 2 */}
                <li className="flex items-start">
                  <div className="mr-2 h-6 w-6 animate-pulse rounded-full bg-gray-600"></div>
                  <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                </li>
                {/* Step 3 */}
                <li className="flex items-start">
                  <div className="mr-2 h-6 w-6 animate-pulse rounded-full bg-gray-600"></div>
                  <div className="h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>
                </li>
              </ul>
              <div className="mt-2 h-4 w-full animate-pulse rounded-lg bg-gray-600"></div>{" "}
              {/* Additional note */}
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="mt-8">
          <div className="mb-4 flex space-x-2">
            {/* Buttons for days */}
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-600"></div>
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-600"></div>
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-600"></div>
          </div>
          <div className="rounded-lg bg-gray-800/50 p-6">
            {/* Leaderboard list skeleton */}
            <div className="space-y-4">
              {/* Simulate a few leaderboard items */}
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600"></div>{" "}
                  {/* Rank */}
                  <div className="h-8 w-full animate-pulse rounded-lg bg-gray-600"></div>{" "}
                  {/* Player info */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiBoxSkeleton;
