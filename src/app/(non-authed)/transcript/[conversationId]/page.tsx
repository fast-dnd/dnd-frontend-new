"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import MobileNavbar from "@/components/mobile-navbar";

import Story from "./components/story";
import TranscriptHeader from "./components/transcript-header";
import TranscriptSkeleton from "./components/transcript-skeleton";
import useGetTranscript from "./hooks/use-get-transcript";

const Transcript = ({ params }: { params: { conversationId: string } }) => {
  const router = useRouter();

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
    <>
      <div className="my-16 hidden h-[900px] w-[1200px] max-w-7xl flex-col self-center lg:flex">
        <TranscriptHeader transcripts={transcripts} />
        <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-y-scroll border-2 border-black bg-black/60 backdrop-blur-sm">
          <div className="relative mx-auto w-full flex-1 flex-col">
            <div className="mx-auto my-6 flex max-w-[900px] flex-1 flex-col gap-6">
              {transcripts.story.map((story, index) => (
                <Story key={index} story={story} transcripts={transcripts} />
              ))}
            </div>
            <div className="sticky bottom-0 h-24 w-full bg-gradient-to-t from-black/90" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:hidden">
        <MobileNavbar onClickBack={() => router.push("/home")} className="fixed z-10 bg-black" />
        <TranscriptHeader transcripts={transcripts} />
        <div className="mt-44 flex flex-col gap-6 px-4 pb-6">
          {transcripts.story.map((story, index) => (
            <Story key={index} story={story} transcripts={transcripts} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Transcript;
