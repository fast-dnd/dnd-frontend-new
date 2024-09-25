/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TextArea } from "@/components/ui/text-area";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import useGetTournament from "../hooks/use-get-tournament";
import AiBoxSkeleton from "./ai-box-skeleton";
import BoxLeaderboardList from "./box-leaderboard-list";

const AiBox = () => {
  const { data, isLoading, error } = useGetTournament();
  const maxCharacters = 250;
  const [playerPrompt, setPlayerPrompt] = useState<string>("");

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

  const query = "How would you design a spaceshuttle?";
  const prize = "5";
  const prizeToken = "USDT";
  const timeRemaining = "4h";

  return (
    <div className={cn("flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto p-4 lg:p-8")}>
      <div className="relative flex w-full flex-row justify-between gap-2 p-2">
        <div
          className={cn(
            // "glass-effect-2",
            "mb-4 flex w-1/2 flex-col items-center justify-center rounded-t-md  p-4 shadow-lg backdrop-blur-lg",
          )}
        >
          <p className="text-2xl font-semibold text-gold" style={jibril.style}>
            Query of the day:
          </p>

          <p className="mb-4 text-xl font-bold tracking-wide text-white">{query}</p>

          <div className="w-full">
            <div className="relative flex flex-1">
              <span className="absolute right-2 top-2 text-xs text-white/50">
                {playerPrompt.length}/{maxCharacters}
              </span>
              <TextArea
                maxLength={maxCharacters}
                className="m-0 h-full w-full rounded-lg border border-white/30 bg-white/5 p-2 text-white placeholder-white/50 focus-within:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="I would try to..."
                onChange={(e) => {
                  const inputText = e.target.value;

                  // Trim the input to the max number of characters
                  const trimmedText = inputText.slice(0, maxCharacters);

                  setPlayerPrompt(trimmedText);
                }}
                value={playerPrompt}
              />
              <Popover>
                <PopoverTrigger className="absolute bottom-2 right-2" asChild>
                  <div className="rounded-xl transition-all duration-300 hover:scale-125 hover:bg-white/10">
                    <span role="img" aria-label="Emoji mode" className="text-2xl">
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
            </div>
          </div>
        </div>
        <div className={cn("flex flex-1 flex-col gap-2")}>
          <h3 className="text-center text-2xl"> How it works?</h3>
          <p className="text-base">Each day is a new chance to win rewards inside of the AI-BOX </p>
          <p className="text-base">step 1: Think, respond to query the best you can</p>
          <p className="text-base">
            step 2: Pray for decentralized AI judge to give you the best rating
          </p>
          <p className="text-base">step 3: Player with highest rating gets the prize </p>
        </div>
        <div className={cn("glass-effect-2", "flex flex-row gap-6")}>
          <img
            src="/images/aibox.jpg"
            alt="ora logo"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
              maskImage: "linear-gradient(to right, rgba(0,0,0,1) 70%, transparent 100%)", // This creates the smooth blend effect on the right side
              marginRight: "-20px", // Adjust this as needed to create overlap with text
            }}
          />
          <div className="relative mt-4 flex flex-col items-center rounded-t-md ">
            <h1
              className="mb-4 text-4xl font-semibold text-gold"
              style={jibril.style}
            >{`Todays prize`}</h1>
            <h1 className="mt-4 font-mono text-6xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              {`${prize} ${prizeToken}`}
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
        <BoxLeaderboardList communityId={"66c4b4997b711a1c9fa667a6"} />
      </div>
    </div>
  );
};

// const formatDate = (dateString: string) => {
//   const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//   const date = new Date(dateString);
//   return date.toLocaleDateString(undefined, options); // undefined means it will use the user's locale
// };

export default AiBox;
