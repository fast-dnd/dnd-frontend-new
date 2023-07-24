"use client";

import { useEffect, useRef, useState } from "react";

import { IDungeonDetail } from "@/types/dungeon";
import { IGameRoomData } from "@/types/game";
import SkeletonIcon from "@/components/icons/skeleton-icon";

import ImageModal from "./image-modal";
import StyledAudio from "./styled-audio";

export interface StoriesProps {
  roomData: IGameRoomData;
  dungeonData: IDungeonDetail;
  lastStory?: string;
}

const Stories = ({ roomData, dungeonData, lastStory }: StoriesProps) => {
  const autoBottomScrollDiv = useRef<HTMLDivElement>(null);
  const [stories, setStories] = useState<string[]>([]);

  useEffect(() => {
    if (roomData) {
      if (lastStory) {
        setStories([...roomData.chatGptResponses, lastStory]);
      } else if (roomData.chatGptResponses.length >= roomData.currentRound + 1) {
        setStories(roomData.chatGptResponses);
      }
    }
  }, [roomData, lastStory]);

  useEffect(() => {
    if (autoBottomScrollDiv.current) {
      autoBottomScrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stories, roomData, lastStory]);

  return (
    <div className="flex  w-full flex-1 flex-col gap-8 pr-4 lg:max-h-full lg:overflow-y-auto lg:pr-6">
      {stories.map((story, i) => {
        const generatedImage = roomData.generatedImages[i];

        return (
          <div key={i} className="flex w-full flex-col gap-8">
            <div className="flex w-full items-center gap-8">
              <div className="flex flex-col text-lg font-semibold uppercase tracking-[0.2em] lg:flex-row lg:text-2xl">
                <span className="mr-2 text-tomato">
                  TURN {i + 1}/{roomData.maxRounds + 1}.
                </span>
                <span>{dungeonData.locations[Math.floor(i / 2)]?.name}</span>
              </div>
              <div className="border-t border-tomato lg:flex-1" />
            </div>
            <div className="w-full">
              {roomData.generateImages && i % 2 === 0 && (
                <div className="mb-4 flex aspect-square w-full shrink-0 justify-center lg:float-left lg:mr-6 lg:inline-block lg:h-72 lg:w-72">
                  {generatedImage && generatedImage.length > 0 ? (
                    <>
                      <ImageModal image={generatedImage} className="hidden lg:block" />
                      <ImageModal image={generatedImage} isMobile={true} className="lg:hidden" />
                    </>
                  ) : (
                    <div className="flex h-full w-full animate-pulse items-center justify-center rounded bg-gray-600">
                      <SkeletonIcon className="h-24 w-24 text-gray-200" />
                    </div>
                  )}
                </div>
              )}

              <div className="tracking-widest lg:text-[22px] lg:leading-8">
                {roomData.generateAudio && (
                  <div className="mb-4">
                    <StyledAudio audio={roomData.generatedAudio[i]} />
                  </div>
                )}
                {story}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={autoBottomScrollDiv} />
    </div>
  );
};

export default Stories;
