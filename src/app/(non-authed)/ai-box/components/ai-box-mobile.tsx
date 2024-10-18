/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ArrowClockwise, CaretDown, CaretUp } from "@phosphor-icons/react";
import EmojiPicker, { Theme } from "emoji-picker-react";

import OraAiCancelBoxPromptModal from "@/components/common/ora-network-modal/aibox-cancel-modal";
import OraAiBoxPromptModal from "@/components/common/ora-network-modal/aibox-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Spinner from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/text-area";
import { jibril } from "@/utils/fonts";

import useGetAiBox from "../hooks/use-get-aibox";
import BoxLeaderboardList from "./box-leaderboard-list";
import TimerComponent from "./timer";

const AiBoxMobile = () => {
  const { data, isLoading, error, refetch, isFetching } = useGetAiBox();

  const [playerPrompt, setPlayerPrompt] = useState<string>("");
  const [selectedEpoch, setSelectedEpoch] = useState<number>(1);
  const [lastRefetch, setLastRefetch] = useState<number>(1);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

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
    return <></>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-bold text-white">Error loading AI box data</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center py-6">
        <h1 className="text-2xl font-bold text-white">No data found</h1>
      </div>
    );
  }

  return (
    <div className="mt-10 flex w-full flex-col space-y-6 p-4">
      {/* Query Section */}
      <div className="space-y-2 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-red-400" style={jibril.style}>
            Query of the day ( prize {data.prize + " " + data.prizeToken} )
          </p>
          <div>
            {isFetching ? (
              <Spinner className="m-0 size-5 opacity-100" style={{ cursor: "pointer" }} />
            ) : (
              <ArrowClockwise
                className="cursor-pointer opacity-100"
                size={24}
                onClick={() => {
                  setLastRefetch(Date.now());
                }}
              />
            )}
          </div>
        </div>

        <p className="text-base font-bold text-white">{data.query + data.handicap}</p>
        <TimerComponent endDate={data.endDate} currentEpoch={data.epoch} />
      </div>

      {/* Prompt Input Section */}
      <div className="fai rounded-lg p-1">
        <div className="relative">
          <TextArea
            maxLength={maxCharacters}
            className="h-32 w-full rounded-lg border border-white/30 bg-white/5 p-2 text-white placeholder-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="I would try to ..."
            onChange={(e) => {
              const inputText = e.target.value;
              const trimmedText = inputText.slice(0, maxCharacters);
              setPlayerPrompt(trimmedText);
            }}
            disabled={!!data.aiJudgeQueryTxHash}
            value={playerPrompt}
          />
          <span className="absolute bottom-3 right-2 text-xs text-white/50">
            {playerPrompt.length}/{maxCharacters}
          </span>
          <div className="absolute bottom-4 left-2  flex space-x-2">
            {!data.aiJudgeQueryTxHash && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="rounded-xl p-1 transition-all duration-300 hover:scale-110 hover:bg-white/10">
                    <span role="img" aria-label="Emoji mode" className="text-xl">
                      😃
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="border-transparent bg-white/5 shadow-none">
                  <EmojiPicker
                    theme={Theme.DARK}
                    onEmojiClick={(emoji) => {
                      setPlayerPrompt(playerPrompt + emoji.emoji);
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="absolute right-1 top-1 flex ">
            <OraAiBoxPromptModal
              aiBoxId={data.aiBoxId}
              prompt={playerPrompt}
              shouldPop={!data.aiJudgeQueryTxHash}
            />
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="rounded-lg bg-gray-800 p-4">
        {data.rating === 0 && !data.aiJudgeQueryTxHash ? (
          <p className="font-bold text-gray-500">
            Today's Rating: To be determined after submitting request
          </p>
        ) : data.rating === 0 && data.aiJudgeQueryTxHash ? (
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
                  {` ${data.aiJudgeQueryTxHash.slice(0, 6)}...${data.aiJudgeQueryTxHash.slice(-4)}`}
                </a>
                )
              </span>
            </p>
            <OraAiCancelBoxPromptModal aiBoxId={data.aiBoxId} />
          </>
        ) : data.rating !== 0 && data.aiJudgeQueryTxHash ? (
          <div className="flex flex-col items-start space-y-2">
            <p className="font-bold text-green-500">
              Today's Rating: {data.rating}{" "}
              <span className="text-red-400">
                (tx:
                <a
                  href={`https://sepolia.arbiscan.io/tx/${data.aiJudgeQueryTxHash}#eventlog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:underline"
                >
                  {` ${data.aiJudgeQueryTxHash.slice(0, 6)}...${data.aiJudgeQueryTxHash.slice(-4)}`}
                </a>
                )
              </span>
            </p>
            <OraAiCancelBoxPromptModal aiBoxId={data.aiBoxId} />
          </div>
        ) : null}
      </div>

      {/* Collapsible "How it works?" Section */}
      <div className="rounded-lg bg-gray-800 p-4">
        <button
          className="flex w-full items-center justify-between text-xl font-semibold text-red-400"
          onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
        >
          How it works?
          {isHowItWorksOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
        </button>
        {isHowItWorksOpen && (
          <div className="space-y-2 pt-4 text-sm text-white">
            <p>
              Each day is a new chance to <strong>win rewards</strong> inside of the{" "}
              <strong>AI-BOX</strong>.
            </p>
            <p>
              <strong>Step 1:</strong> Think, then respond to the query the{" "}
              <strong>best you can</strong>.
            </p>
            <p>
              <strong>Step 2:</strong> Submit response and the{" "}
              <strong>decentralized AI judge</strong> will give a <strong>rating</strong> to it.
            </p>
            <p>
              The player with the <strong>highest rating</strong> gets the prize.
            </p>
            <p className="text-xs text-white">
              *If the transaction is not processed in{" "}
              <strong className="font-semibold text-red-400">5 minutes</strong>, ask on our Discord
              for <strong className="font-semibold text-red-400">help</strong> or cancel the
              request.
            </p>
          </div>
        )}
      </div>

      {/* Leaderboard Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap space-x-2">
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

export default AiBoxMobile;
