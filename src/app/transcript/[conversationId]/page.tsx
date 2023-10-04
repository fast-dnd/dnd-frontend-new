"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy } from "iconsax-react";
import { ChevronLeft } from "lucide-react";

import { jibril } from "@/utils/fonts";
import useCopy from "@/hooks/use-copy";
import GoBackButton from "@/components/go-back-button";

import useGetTranscript from "./hooks/use-get-transcript";

const Transcript = ({ params }: { params: { conversationId: string } }) => {
  const router = useRouter();

  const { conversationId } = params;
  const { data: transcripts, isLoading } = useGetTranscript(conversationId);

  const { copied, onCopy } = useCopy();

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
    <div className="mb-10 flex overflow-y-auto">
      <div className="mx-auto mt-12 flex w-3/5 flex-col">
        <div className="relative flex w-full items-center justify-between rounded-t-md bg-dark-900 px-12 py-6">
          <Link href="/home" className="invisible flex gap-2 font-bold uppercase">
            <ChevronLeft /> Go back
          </Link>
          <div className="relative flex items-center justify-center gap-4">
            <div className="h-2 w-2 rotate-45 bg-primary" />
            <p
              className="mt-1 truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
              style={jibril.style}
            >
              Transcript
            </p>
            <div className="h-2 w-2 rotate-45 bg-primary" />
          </div>
          <div
            className="flex cursor-pointer gap-2 rounded-md bg-white/5 px-4 py-3 font-semibold uppercase text-white/50"
            onClick={() => onCopy(window.location.href)}
          >
            {copied ? "Copied!" : "Copy share link"}
            <Copy variant="Bold" />
          </div>
        </div>
        <div className="rounded-b-md bg-glass p-12 backdrop-blur-2xl">
          <GoBackButton className="mb-8" onClick={() => router.push("/home")} />
          <div className="flex flex-col gap-7">
            <p className="text-xl uppercase tracking-[2px]">Players</p>
            <div className="flex gap-6 border-b border-b-white/20 pb-4">
              {transcripts.players.map((player) => (
                <div key={player.accountId} className="flex items-center gap-2 text-xl">
                  <Image
                    src={player.imageUrl}
                    width={32}
                    height={32}
                    alt={`${player.name}'s avatar`}
                    className="rounded-md"
                  />
                  {player.name}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-10">
            {transcripts.story.map((story, index) => (
              <div key={story.storyChunk} className="flex flex-col gap-4 text-xl ">
                {story.image && (
                  <div className="flex items-center justify-center">
                    <Image
                      src={story.image}
                      width={280}
                      height={280}
                      alt={`${story.title}'s image`}
                    />
                  </div>
                )}
                <p className="tracking-wide">{story.storyChunk}</p>
                <div className="mt-4 flex gap-4">
                  {story.movesInRound?.map((move) => {
                    const player = transcripts.players.find(
                      (player) => player.accountId === move.playerAccountId,
                    );

                    if (!player) return null;

                    return (
                      <>
                        <Image
                          src={player.imageUrl}
                          width={32}
                          height={32}
                          alt={`${player.name}'s avatar`}
                          className="rounded-md"
                        />
                        <span className="font-semibold text-primary">{player.name}:</span>{" "}
                        {move.action}
                      </>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
