/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

import { Box } from "@/components/ui/box";
import { cn } from "@/utils/style-utils";

import useGeneral from "../../hooks/use-general";
import useGetCurrentPlayer from "../../hooks/use-get-current-player";
import AskQuestion from "./ask-question";
import GeneralSkeleton from "./general-skeleton";
import MoveQuestionHistory from "./move-question-history";
import Player from "./player";

const General = ({ conversationId }: { conversationId: string }) => {
  const { currentPlayer } = useGetCurrentPlayer(conversationId);
  const {
    roomData,
    moveHistory = [],
    questionHistory,
    canAsk,
    asking,
    setAsking,
    asciiMovieHistory = [],
  } = useGeneral(conversationId) || {};

  const [activeTab, setActiveTab] = useState("events");

  const [lastViewedMoveHistoryCount, setLastViewedMoveHistoryCount] = useState(moveHistory.length);
  const [lastViewedAsciiMovieHistoryCount, setLastViewedAsciiMovieHistoryCount] = useState(
    asciiMovieHistory.length,
  );

  // Update last viewed counts when the active tab changes
  useEffect(() => {
    if (activeTab === "events") {
      setLastViewedMoveHistoryCount(moveHistory.length);
    } else if (activeTab === "movie") {
      setLastViewedAsciiMovieHistoryCount(asciiMovieHistory.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const newEventsCount =
    activeTab !== "events" ? moveHistory.length - lastViewedMoveHistoryCount : 0;
  const newMovieCount =
    activeTab !== "movie" ? asciiMovieHistory.length - lastViewedAsciiMovieHistoryCount : 0;

  const newEventsCountDisplay = newEventsCount > 0 ? newEventsCount : 0;
  const newMovieCountDisplay = newMovieCount > 0 ? newMovieCount : 0;

  const showTeamStatsTab = roomData && roomData.playerState && roomData.playerState.length > 1;

  const tabs = [
    { name: "Events", key: "events", newCount: newEventsCountDisplay },
    ...(showTeamStatsTab ? [{ name: "Team Stats", key: "stats", newCount: 0 }] : []),
    { name: "Movie", key: "movie", newCount: newMovieCountDisplay },
  ];

  // After hooks are declared, you can safely return early if needed
  if (!roomData || !currentPlayer) return <GeneralSkeleton />;

  return (
    <Box
      title="general"
      className="flex min-h-0 flex-1 flex-col py-5 lg:py-8"
      wrapperClassName="h-full min-h-0"
    >
      <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto px-5 lg:gap-8 lg:px-8">
        {/* Current Player Info */}
        <Player player={currentPlayer} currentPlayer />
        <div className="w-full border-t border-white/25" />

        {/* Tab Headers */}
        <div className="flex w-full">
          {tabs.map((tab, index) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative flex-1 py-2 text-center text-sm font-medium uppercase",
                activeTab === tab.key
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300",
                index === 0 ? "rounded-l-md" : "",
                index === tabs.length - 1 ? "rounded-r-md" : "",
                "border border-gray-300",
              )}
            >
              {tab.name}
              {tab.newCount > 0 && activeTab !== tab.key && (
                <span className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {tab.newCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto lg:gap-8">
          {activeTab === "events" && (
            <>
              <MoveQuestionHistory
                moveHistory={moveHistory}
                questionHistory={questionHistory}
                thinking={asking}
              />

              <AskQuestion
                conversationId={conversationId}
                canAsk={canAsk}
                asking={asking}
                setAsking={setAsking}
              />
            </>
          )}

          {activeTab === "stats" && (
            <div className="flex flex-1 flex-col gap-8">
              {roomData.playerState
                .filter((player) => player.accountId !== currentPlayer.accountId)
                .map((player) => (
                  <Player key={player.accountId} player={player} />
                ))}
            </div>
          )}

          {activeTab === "movie" && (
            <div className="mt-8 flex w-full flex-1 flex-col gap-8">
              {asciiMovieHistory.map((movie, index) => (
                <div
                  key={index}
                  className="relative mx-auto w-11/12 max-w-3xl rounded-lg border-4 border-red-400 bg-gray-800 p-6 shadow-lg"
                >
                  {/* Fancy frame title (optional) */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform rounded-md bg-red-400 px-4 py-1 text-sm font-bold text-gray-800">
                    🎬 SCENE {index + 1}/{asciiMovieHistory.length} 🎥
                  </div>

                  {/* Movie Content */}
                  <div
                    className="flex justify-center text-lg text-white"
                    style={{
                      fontFamily: "monospace", // Monospace font for ASCII art
                      whiteSpace: "pre", // Preserves ASCII art spacing
                      textAlign: "left", // Ensures left alignment
                    }}
                  >
                    {movie}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default General;
