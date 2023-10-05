"use client";

import Link from "next/link";

import GoBackButton from "@/components/go-back-button";

import { Players } from "./components/players";
import Story from "./components/story";
import TranscriptHeader from "./components/transcript-header";
import TranscriptSkeleton from "./components/transcript-skeleton";
import useGetTranscript from "./hooks/use-get-transcript";

const Transcript = ({ params }: { params: { conversationId: string } }) => {
  const { conversationId } = params;
  const { data: transcripts, isLoading } = useGetTranscript(conversationId);

  if (isLoading) return <TranscriptSkeleton />;

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
    <div className="mb-10 flex min-h-0 justify-center">
      <div className="flex h-full w-3/5 flex-col">
        <TranscriptHeader />

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto rounded-b-md bg-glass p-12 backdrop-blur-2xl">
          <GoBackButton className="mb-8" href="/home" />
          <div className="flex h-full flex-col overflow-y-auto pr-4">
            <Players players={transcripts.players} />
            <Story transcripts={transcripts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
