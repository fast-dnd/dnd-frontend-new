"use client";

import Image from "next/image";
import { format } from "date-fns";
import { motion, useScroll } from "framer-motion";
import { PiShareFatFill } from "react-icons/pi";

import ToggleSwitch from "@/components/common/toggle-switch";
import useCopy from "@/hooks/helpers/use-copy";
import { ITranscript } from "@/types/transcript";
import { jibril } from "@/utils/fonts";

const TranscriptHeader = ({
  transcripts,
  hasMovies,
  showMovie,
  setShowMovie,
}: {
  transcripts: ITranscript;
  hasMovies: boolean;
  showMovie: boolean;
  setShowMovie: any;
}) => {
  const { onCopy } = useCopy();

  const { scrollYProgress } = useScroll();

  return (
    <div className="z-10 flex w-full flex-col items-center justify-between bg-dark-800 px-4 pb-5 pt-8 max-lg:fixed max-lg:mt-[45px] lg:rounded-t-md lg:px-6 lg:py-9">
      <div className="flex w-full items-center justify-between">
        <div
          className="hidden items-center gap-4 text-3xl leading-none tracking-widest lg:flex"
          style={jibril.style}
        >
          <div className="size-2 rotate-45 bg-primary" />
          <p className="max-w-[400px] truncate">{transcripts.title}</p>
          <div className="size-2 rotate-45 bg-primary" />
        </div>
        <div className="lg:hidden">
          <p className="font-light">Transcript</p>
          <p className="max-w-[170px] truncate font-bold tracking-widest" style={jibril.style}>
            {transcripts.title}
          </p>
          <p className="font-light text-white/50">{format(transcripts.createdAt, "MMM d, yyyy")}</p>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <p className="hidden font-bold lg:block">
            TRANSCRIPT{" "}
            <span className="font-light">{format(transcripts.createdAt, "MMM d, yyyy")}</span>
          </p>
          <div className="hidden h-10 w-1 border-l border-white/20 lg:block" />
          <p className="hidden font-medium lg:block">Players</p>
          <div className="flex items-center -space-x-2">
            {transcripts.players.map((player) => (
              <div key={player.accountId} className="rounded-full border border-white">
                <Image
                  src={player.imageUrl || "/images/default-avatar.png"}
                  width={26}
                  height={26}
                  alt={`player-${player.accountId}-avatar`}
                  className="size-[26px] rounded-full lg:size-[40px]"
                />
              </div>
            ))}
          </div>
          <div className="h-10 w-1 border-l border-white/20" />

          <p className="hidden lg:inline">
            <span className="font-bold">Views:</span> {transcripts.seenCount}
          </p>

          <div className="h-10 w-1 border-l border-white/20" />

          <div className="flex flex-col items-start">
            <button
              className="flex items-center gap-1 font-semibold lg:text-lg"
              onClick={() => {
                if (typeof window !== "undefined") {
                  onCopy(window.location.href);
                }
              }}
            >
              SHARE
              <PiShareFatFill />
            </button>
            <p className="font-light text-white/50 lg:hidden">{transcripts.seenCount} views</p>
          </div>
        </div>

        <motion.hr
          className="absolute inset-x-0 bottom-0 border-primary transition-all duration-500 lg:hidden"
          style={{ scaleX: scrollYProgress, WebkitTransformOrigin: "0%" }}
        />
      </div>
      {hasMovies && (
        <div className=" mt-4 flex w-full items-center justify-center ">
          <ToggleSwitch
            on={showMovie}
            setOn={setShowMovie}
            items={[
              { text: "Text", icon: <span>📖</span> },
              { text: "Movie", icon: <span>🎥</span> },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default TranscriptHeader;
