"use client";

import Image from "next/image";
import { format } from "date-fns";
import { motion, useScroll } from "framer-motion";
import { PiShareFatFill } from "react-icons/pi";

import useCopy from "@/hooks/helpers/use-copy";
import { ITranscript } from "@/types/transcript";
import { jibril } from "@/utils/fonts";

const TranscriptHeader = ({ transcripts }: { transcripts: ITranscript }) => {
  const { onCopy } = useCopy();

  const { scrollYProgress } = useScroll();

  return (
    <div className="z-10 flex w-full items-center justify-between bg-black px-4 pb-5 pt-8 max-lg:fixed max-lg:mt-[45px] lg:rounded-t-md lg:px-6 lg:py-9">
      <div
        className="hidden items-center gap-4 text-3xl leading-none tracking-widest lg:flex"
        style={jibril.style}
      >
        <div className="h-2 w-2 rotate-45 bg-primary" />
        {transcripts.title}
        <div className="h-2 w-2 rotate-45 bg-primary" />
      </div>
      <div className="lg:hidden">
        <p className="font-light">Transcript</p>
        <p className="font-bold tracking-widest" style={jibril.style}>
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
                className="h-[26px] w-[26px] rounded-full lg:h-[40px] lg:w-[40px]"
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
            onClick={() => onCopy(window.location.href)}
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
  );
};

export default TranscriptHeader;
