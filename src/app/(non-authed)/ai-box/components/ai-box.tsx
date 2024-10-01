/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TextArea } from "@/components/ui/text-area";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import useGetAiBox from "../hooks/use-get-aibox";
import AiBoxSkeleton from "./ai-box-skeleton";
import BoxLeaderboardList from "./box-leaderboard-list";
import TimerComponent from "./timer";

const AiBox = () => {
  const { data, isLoading, error } = useGetAiBox();

  const [playerPrompt, setPlayerPrompt] = useState<string>("");
  const [selectedEpoch, setSelectedEpoch] = useState<number>(1);
  const maxCharacters = 250;

  useEffect(() => {
    if (data) {
      if (data.epoch) {
        setSelectedEpoch(data.epoch);
      }
    }
  }, [data]);

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
          <p className="text-2xl font-semibold text-gold" style={jibril.style}>
            Query of the day:
          </p>
          <p className="mb-2 text-xl font-bold tracking-wide text-white">
            {data.query + data.handicap}
          </p>
          <TimerComponent endDate={data.endDate} currentEpoch={data.epoch} />
          <div className="flex w-full flex-col gap-1">
            <div className="relative flex flex-1">
              <span className="absolute right-1 top-1 text-xs text-white/50">
                {playerPrompt.length}/{maxCharacters}
              </span>

              <TextArea
                maxLength={maxCharacters}
                className="m-0 h-full w-full rounded-lg border border-white/30 bg-white/5 p-4 text-white placeholder-white/50 focus-within:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="I would try to ..."
                onChange={(e) => {
                  const inputText = e.target.value;

                  // Trim the input to the max number of characters
                  const trimmedText = inputText.slice(0, maxCharacters);
                  setPlayerPrompt(trimmedText);
                }}
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
                    <EmojiPicker
                      theme={Theme.DARK}
                      onEmojiClick={(emoji) => {
                        setPlayerPrompt(playerPrompt + emoji.emoji);
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  type="submit"
                  variant="ghost"
                  className="flex items-center justify-center text-primary"
                  aria-label="Send"
                >
                  <IoMdSend className="text-3xl" /> {/* Ensure consistent size with emoji */}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("flex flex-1 flex-col gap-4 rounded-lg  p-4 shadow-md")}>
          <h3 className="mb-2 text-center text-xl font-semibold text-gold">How it works?</h3>
          <p className="mb-1 text-center text-base">
            Each day is a new chance to <strong>win rewards</strong> inside of the{" "}
            <strong>AI-BOX</strong>.
          </p>
          <p className=" text-center text-base">
            <strong>Step 1:</strong> Think, respond to the query the <strong>best you can</strong>.
          </p>
          <p className="text-center text-base">
            <strong>Step 2:</strong> Submit response and <strong>decentralized AI judge</strong>{" "}
            will give <strong>rating</strong> to it.
          </p>
          <p className="text-center text-base">
            The player with the <strong>highest rating</strong> gets the prize.
          </p>
        </div>
        <div style={{ height: "80%" }} className={cn("glass-effect-2", "flex flex-row gap-6")}>
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
              className="mb-4 text-4xl font-semibold text-gold"
              style={jibril.style}
            >{`Todays prize`}</h1>
            <h1 className=" font-mono text-6xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              {data.prize + " " + data.prizeToken}
            </h1>
            <a href="https://www.ora.io/" target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center ">
                  <h1 className="text-center text-lg font-bold tracking-wide text-white">
                    Powered by Ora Protocol
                  </h1>
                  <img
                    src="/images/logos/ora-logo.png"
                    alt="ora logo"
                    style={{ width: "40px", height: "40px", objectFit: "contain" }}
                  />
                </div>
              </div>
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
                  selectedEpoch === epochValue ? "bg-gold text-black" : "bg-gray-700 text-white"
                }`}
                onClick={() => setSelectedEpoch(epochValue)}
              >
                Day {epochValue}
              </button>
            );
          })}
        </div>
        <BoxLeaderboardList epoch={selectedEpoch} />
      </div>
    </div>
  );
};

export default AiBox;
