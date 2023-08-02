"use client";

import React from "react";
import Link from "next/link";

import useGetTranscript from "./hooks/use-get-transcript";

const Transcript = ({ params }: { params: { conversationId: string } }) => {
  const { conversationId } = params;
  const { data: transcripts, isLoading } = useGetTranscript(conversationId);

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto">Loading...</div>
    );
  }

  if (!transcripts) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <Link href="/home" className="text-center text-6xl">
        Go home
      </Link>
      <div className="flex flex-col gap-10">
        {transcripts.map((transcript) => (
          <div key={transcript.storyChunk} className="flex flex-col gap-2">
            <div className="text-xl">
              Story chunk: <span className="text-lg">{transcript.storyChunk}</span>
            </div>
            <div className="text-xl">
              Player Asking: <span className="text-lg">{transcript.playerAsking}</span>
            </div>
            <div className="text-xl">
              Question: <span className="text-lg">{transcript.question}</span>
            </div>
            <div className="text-xl">
              Answer: <span className="text-lg">{transcript.answer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transcript;
