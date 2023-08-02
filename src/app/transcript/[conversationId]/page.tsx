"use client";

import Link from "next/link";

import { Box } from "@/components/ui/box";

import useGetTranscript from "./hooks/use-get-transcript";

const Transcript = ({ params }: { params: { conversationId: string } }) => {
  const { conversationId } = params;
  const { data: transcripts, isLoading } = useGetTranscript(conversationId);

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto">
        <Link href="/home" className="text-center text-6xl underline">
          Go home
        </Link>
        Loading...
      </div>
    );
  }

  if (!transcripts) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Link href="/home" className="text-center text-6xl underline">
          Go home
        </Link>
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <Link href="/home" className="text-center text-6xl underline">
        Go home
      </Link>
      <div className="flex h-[600px] flex-wrap items-center justify-center gap-10 overflow-auto">
        {transcripts.map((transcript, index) => (
          <Box
            title={`Transcript ${index + 1}`}
            key={transcript.storyChunk}
            className="w-[1000px] p-4"
            wrapperClassName="w-[1000px]"
          >
            <div key={transcript.storyChunk} className="flex flex-col gap-2 text-primary">
              <div className="text-xl">
                Story chunk: <span className="text-lg text-white">{transcript.storyChunk}</span>
              </div>
              <div className="text-xl ">
                Player Asking: <span className="text-lg text-white">{transcript.playerAsking}</span>
              </div>
              <div className="text-xl">
                Question: <span className="text-lg text-white">{transcript.question}</span>
              </div>
              <div className="text-xl">
                Answer: <span className="text-lg text-white">{transcript.answer}</span>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Transcript;
