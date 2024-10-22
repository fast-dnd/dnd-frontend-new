/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react";
import EmojiPicker, { Theme } from "emoji-picker-react";

import OraAiCancelBoxPromptModal from "@/components/common/ora-network-modal/aibox-cancel-modal";
import OraAiBoxPromptModal from "@/components/common/ora-network-modal/aibox-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Spinner from "@/components/ui/spinner"; // Importing Spinner component
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

  const [playerPrompt, setPlayerPrompt] = useState<string>("");
  const [selectedEpoch, setSelectedEpoch] = useState<number>(1);
  const [lastRefetch, setLastRefetch] = useState<number>(1);

  const maxCharacters = 250;

  useEffect(() => {
    if (data) {
      if (data.epoch) {
        setSelectedEpoch(data.epoch);
      }
      if (data.prompt) {
        setPlayerPrompt(data.prompt);
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [lastRefetch]);

  if (isLoading) {
    return <AiBoxSkeleton />;
  }

  if (error) {
    return (
      <div className="mb-4 flex flex-col items-center rounded-t-md py-6">
        <h1 className="text-4xl font-bold tracking-wide text-white">Error loading ai box data</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mb-4 flex flex-col items-center rounded-t-md py-6">
        <h1 className="text-4xl font-bold tracking-wide text-white">No data found </h1>
      </div>
    );
  }

  return (
    <div className={cn("no-scrollbar flex min-h-0 w-full flex-1 flex-col overflow-hidden p-2 ")}>
      <div className="relative flex w-full flex-row justify-between gap-2 p-2">
        <div
          className={cn(
            "mb-4 flex w-2/5 flex-col items-center justify-center rounded-t-md  p-4 shadow-lg backdrop-blur-lg",
          )}
        >
          {isFetching ? (
            <Spinner
              className="absolute left-2 top-2 m-0 size-5 shrink-0 opacity-100"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <ArrowClockwise
              className="absolute left-2 top-2 m-0 size-5 shrink-0 cursor-pointer opacity-100"
              size={24}
              onClick={() => {
                setLastRefetch(Date.now());
              }}
            />
          )}
          <p className="text-2xl font-semibold text-red-400" style={jibril.style}>
            Query of the day:
          </p>
          <p className="mb-2 text-xl font-bold tracking-wide text-white">
            {data.query + data.handicap}
          </p>
          <TimerComponent endDate={data.endDate} currentEpoch={data.epoch} />
          <div className="flex w-full flex-col gap-1">
            <div className="relative flex flex-1">
              <span className="absolute right-2 top-2 text-xs text-white/50">
                {playerPrompt.length}/{maxCharacters}
              </span>

              <TextArea
                maxLength={maxCharacters}
                className="m-0 mt-1 h-full w-full rounded-lg border border-white/30 bg-white/5 p-4 text-white placeholder-white/50 focus-within:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="I would try to ..."
                onChange={(e) => {
                  const inputText = e.target.value;

                  // Trim the input to the max number of characters
                  const trimmedText = inputText.slice(0, maxCharacters);
                  setPlayerPrompt(trimmedText);
                }}
                disabled={data.aiJudgeQueryTxHash ? true : false}
                value={playerPrompt}
                style={{ minHeight: "100px" }} // Increase TextArea size by default
              />

              <div className="absolute bottom-1 right-0 flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="rounded-xl transition-all duration-300 hover:scale-125 hover:bg-white/10">
                      <span role="img" aria-label="Emoji mode" className="text-xl">
                        😃
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="border-transparent bg-white/5 shadow-none">
                    {data.aiJudgeQueryTxHash ? (
                      false
                    ) : true ? (
                      <EmojiPicker
                        theme={Theme.DARK}
                        onEmojiClick={(emoji) => {
                          setPlayerPrompt(playerPrompt + emoji.emoji);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </PopoverContent>
                </Popover>

                <OraAiBoxPromptModal
                  aiBoxId={data.aiBoxId}
                  prompt={playerPrompt}
                  shouldPop={data.aiJudgeQueryTxHash ? false : true}
                />
              </div>
            </div>
          </div>
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
                      {` ${data.aiJudgeQueryTxHash.slice(0, 6)}...${data.aiJudgeQueryTxHash.slice(
                        -4,
                      )}`}
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
                      {` ${data.aiJudgeQueryTxHash.slice(0, 6)}...${data.aiJudgeQueryTxHash.slice(
                        -4,
                      )}`}
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
        </div>
        <div className={cn("flex flex-1 flex-col gap-4 rounded-lg  p-4 shadow-md")}>
          <h3 className="mb-2 text-center text-xl font-semibold text-red-400">How it works?</h3>
          <p className="mb-1 text-center text-base">
            Each day is a new chance to <strong>win rewards</strong> inside of the{" "}
            <strong>AI-BOX</strong>.
          </p>
          <p className=" text-center text-base">
            <strong>Step 1:</strong> Think, then respond to the query the{" "}
            <strong>best you can</strong>.
          </p>
          <p className="text-center text-base">
            <strong>Step 2:</strong> Submit response and <strong>decentralized AI judge</strong>{" "}
            will give <strong>rating</strong> to it.
          </p>
          <p className="text-center text-base">
            The player with the <strong>highest rating</strong> gets the prize.
          </p>
          <p className="text-center text-white">
            *If transaction is not processed in{" "}
            <strong className="font-semibold text-red-400">5 minutes</strong> ask on our discord for{" "}
            <strong className="font-semibold text-red-400">help</strong> or cancel request.
          </p>
        </div>
        <div style={{ height: "80%" }} className={cn("flex flex-row gap-6")}>
          <img
            src="/images/aibox.jpg"
            alt="ora logo"
            style={{
              width: "200px",
              height: "220px",
              objectFit: "contain",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)",
              maskComposite: "intersect",
              marginRight: "-20px", // Adjust this as needed to create overlap with text
            }}
          />
          <div className="relative mt-4 flex flex-col items-center rounded-t-md p-2">
            <h1
              className="mb-4 text-4xl font-semibold text-red-400"
              style={jibril.style}
            >{`Todays prize`}</h1>
            <h1 className=" font-mono text-6xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              {data.prize + " " + data.prizeToken}
            </h1>
            <a href="https://www.ora.io/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center ">
                  <h1 className="text-center text-lg font-bold tracking-wide text-white">
                    Powered by ORA Protocol
                  </h1>
                  <img
                    src="/images/logos/ora-logo.png"
                    alt="ora logo"
                    style={{ width: "40px", height: "40px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </a>
            <a
              href="https://www.alchemy.com/faucets/arbitrum-sepolia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2"
            >
              <p className="text-center text-lg font-bold tracking-wide text-red-400 group-hover:underline">
                Click to get free testnet tokens on Arbitrum
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className={cn("w-full ")}>
        <div className="mb-2 flex space-x-2">
          {Array.from({ length: Math.min(data.epoch, 3) }, (_, index) => {
            const epochValue = data.epoch - index;
            return (
              <button
                key={epochValue}
                className={`rounded px-3 py-1 ${
                  selectedEpoch === epochValue ? "bg-red-400 text-black" : "bg-gray-700 text-white"
                }`}
                onClick={() => setSelectedEpoch(epochValue)}
              >
                Day {epochValue}
              </button>
            );
          })}
        </div>
        <BoxLeaderboardList epoch={selectedEpoch} lastRefetch={lastRefetch} />
      </div>
    </div>
  );
};

export default AiBoxDesktop;
