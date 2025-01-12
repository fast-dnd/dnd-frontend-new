/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import Story from "./components/story";
import TranscriptHeader from "./components/transcript-header";
import TranscriptSkeleton from "./components/transcript-skeleton";
import useGetTranscript from "./hooks/use-get-transcript";

const Transcript = ({ params }: { params: { conversationId: string } }) => {
  const router = useRouter();
  const { conversationId } = params;
  const avatarMapRef = useRef<Record<string, string>>({});

  // State for toggling between story and movie
  const [showMovie, setShowMovie] = useState(false);

  const { data: transcripts, isLoading } = useGetTranscript(conversationId);

  if (isLoading) return <TranscriptSkeleton />;

  if (!transcripts) {
    return (
      <div className="flex size-full items-center justify-center">
        <Link href="/home" className="text-center text-6xl underline">
          Go home
        </Link>
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  // Check if there are movies in the transcript
  const hasMovies = transcripts.asciiMovie && transcripts.asciiMovie.length > 0;

  return (
    <>
      <div className="my-16 hidden min-h-0 w-[1800px] max-w-fit flex-1 flex-col self-center lg:flex">
        <TranscriptHeader
          transcripts={transcripts}
          hasMovies={hasMovies}
          showMovie={showMovie}
          setShowMovie={setShowMovie}
        />

        <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-y-scroll border-2 border-black bg-dark-900 backdrop-blur-sm">
          <div className="relative mx-auto w-full flex-1 flex-col">
            <div className="mx-auto my-6 flex max-w-[1600px] flex-1 flex-col gap-6">
              {/* Conditionally render text or movie */}
              {showMovie && hasMovies
                ? transcripts.asciiMovie.map((movie, index) => (
                    <div
                      key={index}
                      className="relative mx-auto w-11/12 max-w-3xl rounded-lg border-4 border-red-400 bg-gray-800 p-6 shadow-lg"
                    >
                      {/* Fancy frame title (optional) */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform rounded-md bg-red-400 px-4 py-1 font-bold text-gray-800">
                        🎬 SCENE {index + 1}/{transcripts.asciiMovie.length} 🎥
                      </div>

                      {/* Movie Content */}
                      <div
                        className="flex justify-center text-lg text-white"
                        style={{
                          fontFamily: "monospace", // Monospace font for ASCII art
                          whiteSpace: "pre", // Preserves ASCII art spacing
                          textAlign: "left", // Ensures left alignment
                        }}
                      >
                        {movie}
                      </div>
                    </div>
                  ))
                : transcripts.story.map((story, index) => (
                    <Story
                      key={index}
                      story={story}
                      transcripts={transcripts}
                      avatarMapRef={avatarMapRef}
                    />
                  ))}
            </div>
            <div className="sticky bottom-0 h-24 w-full bg-gradient-to-t from-black/90" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:hidden">
        <MobileNavbar onClickBack={() => router.push("/home")} className="fixed z-10 bg-dark-900" />
        <TranscriptHeader
          transcripts={transcripts}
          hasMovies={hasMovies}
          showMovie={showMovie}
          setShowMovie={setShowMovie}
        />

        <div className="mt-60 flex flex-col gap-6 px-4 pb-6">
          {/* Conditionally render text or movie */}
          {showMovie && hasMovies ? (
            <div className="mt-20 flex flex-col gap-6 rounded-md p-1 pb-6 lg:p-8">
              {transcripts.asciiMovie.map((movie, index) => (
                <div
                  key={index}
                  className="relative mx-auto w-11/12 max-w-3xl rounded-lg border-4 border-red-400 bg-gray-800 p-6 shadow-lg"
                >
                  {/* Fancy frame title (optional) */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform rounded-md bg-red-400 px-4 py-1 text-sm font-bold text-gray-800">
                    🎬 SCENE {index + 1}/{transcripts.asciiMovie.length} 🎥
                  </div>

                  {/* Movie Content */}
                  <div
                    className="mt-2 flex justify-center text-sm text-white"
                    style={{
                      fontFamily: "monospace", // Monospace font for ASCII art
                      whiteSpace: "pre", // Preserves ASCII art spacing
                      textAlign: "left", // Ensures left alignment
                    }}
                  >
                    {movie}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            transcripts.story.map((story, index) => (
              <Story
                key={index}
                story={story}
                transcripts={transcripts}
                avatarMapRef={avatarMapRef}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Transcript;
