import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { NoAiBoxes } from "@/components/common/aibox";
import { jibril } from "@/utils/fonts";

import useGetAiBoxes from "../hooks/use-get-aiboxes";
import TimerComponent from "./timer";

const MyBoxes: React.FC = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isError, isLoading, refetch } =
    useGetAiBoxes();
  const router = useRouter();

  // Flatten the pages to get a single array of boxes
  const boxes = data ? data.pages?.flatMap((page) => page.boxes) : [];

  // Refetch data whenever the component mounts or on route change
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isError) {
      console.error("Failed to fetch boxes.");
    }
  }, [isError]);

  const handleBoxClick = (boxId: string) => {
    router.push(`/ai-box/${boxId}`);
  };

  return (
    <div className="relative z-10 flex min-h-[800px] flex-col rounded-xl bg-gray-900/80 p-8 backdrop-blur-xl">
      {/* Header Section */}
      <div className="relative mb-8 flex flex-wrap items-center justify-between space-y-2 md:space-y-0">
        <h1
          className="mx-auto w-full text-center text-4xl font-bold tracking-wider text-red-400 md:w-auto"
          style={jibril.style}
        >
          MY BOXES
        </h1>
      </div>

      {/* Loading State */}
      {isLoading || !boxes ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : boxes.length === 0 ? (
        <NoAiBoxes />
      ) : (
        <>
          {/* Boxes Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {boxes.map((box) => (
              <div
                key={box.aiBoxId}
                onClick={() => handleBoxClick(box.aiBoxId)}
                className="cursor-pointer rounded-lg bg-gray-800/50 p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <h2 className="mb-2 text-center text-2xl font-semibold text-red-400">{box.name}</h2>
                <p className="text-center text-gray-300">
                  Mode:{" "}
                  <span className="font-semibold">
                    {box.verifiable === false ? "🌴 Casual" : "🔒 Verifiable"}
                  </span>
                </p>
                <p className="text-center text-gray-300">
                  <TimerComponent endDate={box.endDate} currentEpoch={-1} />
                </p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasNextPage && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={`rounded-lg px-4 py-2 ${
                  isFetchingNextPage ? "bg-gray-700 text-gray-400" : "bg-red-400 text-gray-900"
                } transition-colors hover:bg-red-300`}
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Share Note - positioned at the bottom */}
      <div className="mt-auto text-center text-gray-400">
        Open the box and copy the URL. Share it with your friends and let them try to beat you!
        Example:
        <span className="font-semibold text-red-400">
          {" "}
          https://play.v3rpg.com/ai-box/672..63b6c
        </span>
      </div>
    </div>
  );
};

export default MyBoxes;
