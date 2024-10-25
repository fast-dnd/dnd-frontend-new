/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import OraAiCancelBoxPromptModal from "@/components/common/ora-network-modal/aibox-cancel-modal";
import OraAiBoxPromptModal from "@/components/common/ora-network-modal/aibox-modal";
import { TextArea } from "@/components/ui/text-area";
import chainService from "@/services/chain-service";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import useGetAiBox from "../hooks/use-get-aibox";
import AiBoxSkeleton from "./ai-box-skeleton";
import BoxLeaderboardList from "./box-leaderboard-list";
import TimerComponent from "./timer";

const AiBoxDesktop = () => {
  const { data, isLoading, error, refetch, isFetching } = useGetAiBox();
  const [playerPrompt, setPlayerPrompt] = useState("");
  const [selectedEpoch, setSelectedEpoch] = useState(1);
  const [lastRefetch, setLastRefetch] = useState(1);

  const maxCharacters = 250;

  useEffect(() => {
    if (data) {
      if (data.epoch) setSelectedEpoch(data.epoch);
      if (data.prompt) setPlayerPrompt(data.prompt);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [lastRefetch]);

  if (isLoading) return <AiBoxSkeleton />;

  if (error || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="rounded-lg bg-gray-900/60 p-8 text-center backdrop-blur-lg">
          <h1 className="text-2xl font-bold text-red-400">
            {error ? "Error loading AI box data" : "No data found"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full p-6">
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-b to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl rounded-xl bg-gray-900/80 p-8 backdrop-blur-xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-center">
          <h1 className="text-4xl font-bold tracking-wider text-red-400" style={jibril.style}>
            AI Challenge
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Query and Input */}
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-800/50 p-6">
              <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">📦 Box Query</h2>
              <p className="mb-4 space-y-3 text-xl text-gray-300">{data.query + data.handicap}</p>
              <TimerComponent endDate={data.endDate} currentEpoch={data.epoch} />
            </div>

            <div className="rounded-lg bg-gray-800/50 p-6">
              <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
                ✍️ Your Response
              </h2>

              <div className="relative">
                <TextArea
                  maxLength={maxCharacters}
                  className="min-h-[120px] w-full rounded-lg border border-gray-700 bg-gray-900/50 p-4 text-white placeholder-gray-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                  placeholder="I think ..."
                  value={playerPrompt}
                  onChange={(e) => setPlayerPrompt(e.target.value.slice(0, maxCharacters))}
                  disabled={!!data.aiJudgeQueryTxHash}
                />
                <span className="absolute bottom-4 right-2 text-sm text-gray-400">
                  {playerPrompt.length}/{maxCharacters}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="mt-2 flex space-x-2">
                  {/* Check if rating is 0 and there's no aiJudgeQueryTxHash */}
                  {data.rating === 0 && !data.aiJudgeQueryTxHash ? (
                    <p className="font-bold text-gray-500">
                      Today's Rating: To be determined after submitting request
                    </p>
                  ) : data.rating === 0 && data.aiJudgeQueryTxHash ? (
                    // If rating is 0 but aiJudgeQueryTxHash exists, show 'Rating: Pending' with the tx hash link
                    <>
                      <p className="font-bold text-yellow-500">
                        Today's Rating: Pending{" "}
                        <span className="text-red-400">
                          (tx:
                          <a
                            href={`https://sepolia.arbiscan.io/tx/${data.aiJudgeQueryTxHash}#eventlog`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:underline"
                          >
                            {`${data.aiJudgeQueryTxHash.slice(
                              0,
                              6,
                            )}...${data.aiJudgeQueryTxHash.slice(-4)}`}
                          </a>
                          )
                        </span>
                      </p>
                      <OraAiCancelBoxPromptModal aiBoxId={data.aiBoxId} />
                    </>
                  ) : data.rating !== 0 && data.aiJudgeQueryTxHash ? (
                    // If both rating and aiJudgeQueryTxHash exist, show rating and tx hash link
                    <div className="flex items-center space-x-4">
                      <p className="font-bold text-green-500">
                        Today's Rating: {data.rating}{" "}
                        <span className="text-red-400">
                          (tx:
                          <a
                            href={`${chainService.getExplorerUrl(data.transactions[0].chain)}${
                              data.aiJudgeQueryTxHash
                            }#eventlog`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:underline"
                          >
                            {`${data.aiJudgeQueryTxHash.slice(
                              0,
                              6,
                            )}...${data.aiJudgeQueryTxHash.slice(-4)}`}
                          </a>
                          )
                        </span>
                      </p>
                      <OraAiCancelBoxPromptModal aiBoxId={data.aiBoxId} />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <OraAiBoxPromptModal
                  aiBoxId={data.aiBoxId}
                  prompt={playerPrompt}
                  shouldPop={!data.aiJudgeQueryTxHash}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Prize and Info */}
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-800/50 p-6 text-center">
              <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
                🏆 Today's Prize
              </h2>
              <p className="text-5xl font-bold text-yellow-200">
                {data.prize} {data.prizeToken}
              </p>
              <div className="mt-4 inline-flex items-center space-x-2 rounded-full bg-red-400/10 px-4 py-2 text-red-400">
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

            <div className="rounded-lg bg-gray-800/50 p-6">
              <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">
                How it Works?
              </h2>
              <p className="mb-2 space-y-3 text-gray-300">
                Each day is a new chance to win rewards inside of the AI-BOX.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 rounded-full bg-red-400/20 px-2 py-1 text-sm text-red-400">
                    1️
                  </span>
                  Think and respond to the daily query
                </li>
                <li className="flex items-start">
                  <span className="mr-2 rounded-full bg-red-400/20 px-2 py-1 text-sm text-red-400">
                    2️
                  </span>
                  Submit your response for AI evaluation
                </li>
                <li className="flex items-start">
                  <span className="mr-2 rounded-full bg-red-400/20 px-2 py-1 text-sm text-red-400">
                    3️
                  </span>
                  Highest rated response wins the prize
                </li>
              </ul>
              <p className="mt-2 space-y-3 text-gray-300">
                *If transaction is not processed in{" "}
                <strong className="font-semibold text-red-400">5 minutes</strong>, ask on our
                Discord for <strong className="font-semibold text-red-400">help</strong> or cancel
                request.
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="mt-8">
          <div className="mb-4 flex space-x-2">
            {Array.from({ length: Math.min(data.epoch, 3) }, (_, index) => {
              const epochValue = data.epoch - index;
              return (
                <button
                  key={epochValue}
                  className={cn(
                    "rounded-lg px-4 py-2 font-medium transition-all",
                    selectedEpoch === epochValue
                      ? "bg-red-400 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700",
                  )}
                  onClick={() => setSelectedEpoch(epochValue)}
                >
                  Day {epochValue}
                </button>
              );
            })}
          </div>

          <div className="rounded-lg bg-gray-800/50 p-6">
            <BoxLeaderboardList epoch={selectedEpoch} lastRefetch={lastRefetch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiBoxDesktop;
