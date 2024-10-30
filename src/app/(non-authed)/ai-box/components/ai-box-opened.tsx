/* eslint-disable react/no-unescaped-entities */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowClockwise } from "@phosphor-icons/react";
import { IoMdSend } from "react-icons/io";
import { toast } from "sonner";

import OraAiCancelBoxPromptModal from "@/components/common/ora-network-modal/aibox-cancel-modal";
import OraAiBoxPromptModal from "@/components/common/ora-network-modal/aibox-modal";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { Tooltip } from "@/components/ui/tooltip";
import useAuth from "@/hooks/helpers/use-auth";
import aiBoxService from "@/services/aibox-service";
import chainService from "@/services/chain-service";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import useGuest from "../../guest/hooks/use-guest";
import useGetAiBox from "../hooks/use-get-aibox";
import AiBoxSkeleton from "./ai-box-skeleton";
import BoxLeaderboardList from "./box-leaderboard-list";
import TimerComponent from "./timer";

interface OpenBoxProps {
  boxId?: string;
}

const OpenedBox: React.FC<OpenBoxProps> = ({ boxId }) => {
  const { data, isLoading, error, refetch, isFetching } = useGetAiBox(boxId);
  const [playerPrompt, setPlayerPrompt] = useState("");
  const [selectedEpoch, setSelectedEpoch] = useState(1);
  const [lastRefetch, setLastRefetch] = useState(1);
  const [userRankData, setUserRankData] = useState<any | null>(null);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const guestData = useGuest();
  const { user, loggedIn } = useAuth();
  const [isSendingCasualRequest, setIsSendingCasualRequest] = useState(false);

  const customBox = !!boxId; // true if boxId is defined
  const maxCharacters = 250;

  useEffect(() => {
    if (data) {
      if (data.epoch) setSelectedEpoch(data.epoch);
      if (data.prompt) setPlayerPrompt(data.prompt);
      if (checkGameEnds(data.endDate)) {
        setGameEnd(true);
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [lastRefetch, refetch]);

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

  const checkGameEnds = (endDate: number) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    let timeDifference = endDate - currentTimestamp;

    if (timeDifference <= 0) {
      return true;
    }
    return false;
  };

  const handleCasualBoxSubmitPrompt = async (aiBoxId: string, prompt: string) => {
    setIsSendingCasualRequest(true);
    try {
      toast.success(`Request sent, wait for ~5sec for it to be processed, and refresh the page`);
      await aiBoxService.submitPrompt(aiBoxId, prompt, "request");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting prompt:", error);
      //   toast.error(`Error: ${JSON.stringify(error)}`);
    } finally {
      setIsSendingCasualRequest(false);
    }
  };

  return (
    <div className="relative rounded-xl p-1 backdrop-blur-xl lg:bg-gray-900/80 lg:p-4">
      {/* Header Section */}
      <div className="mb-8 flex flex-col space-y-4">
        {/* Mode Indicator and Refresh Button */}
        <div className="flex items-center justify-between">
          {/* Box Type Indicator with Hover Tooltip */}
          <div className="cursor-pointer text-lg text-gray-300">
            <span
              className="hover:underline"
              title={
                data.verifiable
                  ? "Verifiable box is powered by ORA Protocol. Each query is rated by decentralized AI. Transaction is provided as proof of rating."
                  : "Casual box is rated by V3RPG AI judge. This is a centralized mechanism, providing an immediate rating without on-chain proof."
              }
            >
              {data.verifiable ? "🔒 Verifiable mode" : "🌴 Casual mode"}
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => setLastRefetch(Date.now())}
            className="relative z-10 rounded-full bg-gray-800 p-2 transition-all hover:bg-gray-700"
          >
            {isFetching ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
            ) : (
              <ArrowClockwise className="h-6 w-6 text-red-400" />
            )}
          </button>
        </div>

        {/* Main Title */}
        {!customBox ? (
          <></>
        ) : (
          <h1
            className="text-center text-4xl font-bold tracking-wider text-red-400"
            style={jibril.style}
          >
            {data.name}
          </h1>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Query and Input */}
        <div className="space-y-6">
          <div className="rounded-lg bg-gray-800/50 p-6">
            <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">📦 Box Query</h2>
            <p className="mb-4 space-y-3 text-xl text-gray-300">{data.query + data.handicap}</p>
            {!customBox ? (
              <TimerComponent endDate={data.endDate} currentEpoch={data.epoch} />
            ) : (
              <TimerComponent endDate={data.endDate} currentEpoch={-1} />
            )}
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
                disabled={data.aiJudgeQueryTxHash || data.rating > 0 || gameEnd ? true : false}
              />
              <span className="absolute bottom-4 right-2 text-sm text-gray-400">
                {playerPrompt.length}/{maxCharacters}
              </span>
            </div>

            <div className="flex items-center justify-between">
              {data.verifiable ? (
                <div className="flex w-full items-center justify-between">
                  <div className="flex space-x-2">
                    {/* Check if rating is 0 and there's no aiJudgeQueryTxHash */}
                    {gameEnd ? (
                      <></>
                    ) : data.rating === 0 && !data.aiJudgeQueryTxHash ? (
                      <p className="font-bold text-gray-500">
                        Rating: To be determined after submitting request
                      </p>
                    ) : data.rating === 0 && data.aiJudgeQueryTxHash ? (
                      // If rating is 0 but aiJudgeQueryTxHash exists, show 'Rating: Pending' with the tx hash link
                      <>
                        <p className="font-bold text-yellow-500">
                          Rating: Pending{" "}
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
                          Rating: {data.rating}{" "}
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
                  {gameEnd ? (
                    <>
                      <p className="font-bold text-green-500">game ended, can't post a prompt </p>
                    </>
                  ) : (
                    <OraAiBoxPromptModal
                      aiBoxId={data.aiBoxId}
                      prompt={playerPrompt}
                      shouldPop={!data.aiJudgeQueryTxHash}
                    />
                  )}
                </div>
              ) : (
                <div className="flex w-full flex-row items-center justify-between ">
                  <div className="flex flex-1 space-x-2 ">
                    {data.rating === 0 ? (
                      <p className="font-bold text-gray-500">
                        Rating: To be determined after submitting request
                      </p>
                    ) : data.rating !== 0 ? (
                      <p className="font-bold text-green-500">Rating: {data.rating}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {gameEnd ? (
                      <></>
                    ) : data.rating === 0 ? (
                      <Button
                        type="submit"
                        variant="ghost"
                        className=" text-primary"
                        aria-label="Send"
                        disabled={isSendingCasualRequest}
                        onClick={() => handleCasualBoxSubmitPrompt(data.aiBoxId, playerPrompt)}
                      >
                        {isSendingCasualRequest ? (
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                          <IoMdSend className="text-3xl" /> // Send icon when not loading
                        )}{" "}
                      </Button>
                    ) : (
                      <Tooltip content="Prompt has already been sent. It can take up to a couple of minutes for it to resolve. Refresh the page to check if it was processed.">
                        <Button
                          type="submit"
                          variant="ghost"
                          className=" text-primary"
                          aria-label="Send"
                          disabled
                        >
                          <IoMdSend className="text-3xl" />{" "}
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Prize and Info */}
        <div className="space-y-6">
          {/* Ultimate Battle Prize Section */}
          <div className="relative mb-6 flex flex-col items-center justify-center rounded-lg border-4 border-blue-200 bg-gray-800/50 p-4 shadow-md">
            <div
              className="pointer-events-none absolute inset-0 rounded-lg border-4 border-double border-blue-300 opacity-70"
              style={{ transform: "rotate(-2deg)" }}
            ></div>
            <h3 className="mb-2 text-center text-xl font-semibold text-red-200">🎁 Box Prize 🎁</h3>
            {!customBox ? (
              <>
                <p className="text-center text-5xl font-bold text-yellow-200">
                  {data.prize} {data.prizeToken}
                </p>
              </>
            ) : (
              <>
                <p className="text-center text-lg font-semibold text-gray-300">
                  Custom boxes do not have prizes
                </p>
                <p className="text-center text-sm font-semibold text-gray-300">
                  Check daily box if you are interestend in claiming cool rewards
                </p>
              </>
            )}
            {data.verifiable ? (
              <div className="mt-4 flex items-center justify-center space-x-2 rounded-full bg-red-300/10 px-4 py-2 text-red-200">
                <a href="https://www.ora.io/" target="_blank" rel="noopener noreferrer">
                  <span>Powered by ORA Protocol</span>
                </a>
                <img
                  src="/images/logos/ora-logo.png"
                  alt="ora logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="rounded-lg bg-gray-800/50 p-6">
            <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">How it Works?</h2>
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
              <strong className="font-semibold text-red-400">5 minutes</strong>, ask on our Discord
              for <strong className="font-semibold text-red-400">help</strong>
              {data.verifiable && <> or cancel request.</>}
            </p>
          </div>
        </div>
      </div>
      {/* User rank */}
      <div className="mt-4 rounded-lg bg-gray-800/50 p-6 text-center">
        <h2 className="mb-4 text-center text-2xl font-semibold text-red-400">🎖️ My Rank</h2>

        {/* User Avatar */}
        <div className="mb-4 flex justify-center">
          <Image
            src={
              loggedIn && user?.account.imageUrl
                ? user.account.imageUrl
                : "/images/default-avatar.png"
            }
            alt="avatar"
            width={75}
            height={75}
            className="rounded-full"
          />
        </div>

        {/* Username */}
        <p className="text-lg font-semibold text-gray-300">
          {loggedIn ? user?.account.username : guestData?.guestName}
        </p>

        {/* Rank */}
        <p className="text-xl font-bold text-yellow-200">
          {userRankData && userRankData.userRank
            ? `Rank: #${userRankData.userRank}`
            : "Not ranked yet"}
        </p>

        {/* Rating */}
        <p className="mt-2 text-gray-300">
          {userRankData && userRankData.userRating && userRankData?.userRating !== 0 ? (
            `Rating: ${userRankData.userRating}`
          ) : (
            <span className="font-bold text-gray-500">
              Rating: To be determined after submitting request
            </span>
          )}
        </p>
      </div>

      {/* Leaderboard Section */}
      <div className="mt-8">
        {!customBox ? (
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
        ) : (
          <></>
        )}

        <BoxLeaderboardList
          epoch={selectedEpoch}
          lastRefetch={lastRefetch}
          verifiable={data.verifiable}
          boxId={customBox ? data.aiBoxId : ""}
          onUserRankDataFetched={setUserRankData}
        />
      </div>
    </div>
  );
};

export default OpenedBox;
