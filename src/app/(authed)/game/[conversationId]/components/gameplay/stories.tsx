/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import { useRef } from "react";
import Markdown from "react-markdown";

import SkeletonIcon from "@/components/icons/skeleton-icon";
import useAutoScrollToBottom from "@/hooks/helpers/use-auto-scroll-to-bottom";
import { IDungeonDetail } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { jibril } from "@/utils/fonts";

import useUpdateStories from "../../hooks/use-update-stories";
import StyledAudio from "./styled-audio";

interface IStoriesProps {
  roomData: IRoomDetail;
  dungeonData: IDungeonDetail;
  lastStory?: string;
}

const Stories = ({ roomData, dungeonData, lastStory }: IStoriesProps) => {
  const { stories } = useUpdateStories({ roomData, lastStory });
  const { autoBottomScrollDiv } = useAutoScrollToBottom([roomData, stories]);

  return (
    <div className="flex w-full flex-1 flex-col gap-8 lg:overflow-y-auto lg:pr-6">
      <StoryList roomData={roomData} dungeonData={dungeonData} stories={stories} />
      <div ref={autoBottomScrollDiv} />
    </div>
  );
};

interface IStoryListProps {
  roomData: IRoomDetail;
  dungeonData: IDungeonDetail;
  stories: string[];
}

const avatarPool = [
  "/images/default-characters/c1.png",
  "/images/default-characters/c2.png",
  "/images/default-characters/c3.png",
  "/images/default-characters/c4.png",
  "/images/default-characters/c5.png",
  "/images/default-characters/c6.png",
  "/images/default-characters/c7.png",
  "/images/default-characters/c8.png",
  "/images/default-characters/c9.png",
  "/images/default-characters/c10.png",
  "/images/default-characters/c11.png",
  "/images/default-characters/c12.png",
  "/images/default-characters/c13.png",
  "/images/default-characters/c14.png",
  "/images/default-characters/c15.png",
  "/images/default-characters/c16.png",
  "/images/default-characters/c17.png",
  "/images/default-characters/c18.png",
  "/images/default-characters/c19.png",
  "/images/default-characters/c20.png",
  "/images/default-characters/c21.png",
  "/images/default-characters/c22.png",
  "/images/default-characters/c23.png",
  "/images/default-characters/c24.png",
  "/images/default-characters/c25.png",
  "/images/default-characters/c26.png",
  "/images/default-characters/c27.png",
  "/images/default-characters/c28.png",
  "/images/default-characters/c29.png",
  "/images/default-characters/c30.png",
  "/images/default-characters/c31.png",
  "/images/default-characters/c32.png",
  "/images/default-characters/c33.png",
  "/images/default-characters/c34.png",
  "/images/default-characters/c35.png",
  "/images/default-characters/c36.png",
  "/images/default-characters/c37.png",
  "/images/default-characters/c38.png",
  "/images/default-characters/c39.png",
];

const StoryList = ({ roomData, dungeonData, stories }: IStoryListProps) => {
  const avatarMapRef = useRef<Record<string, string>>({});

  const assignAvatars = (story: string) => {
    const dialogueRegex = /\[([^\]]+)\]|([\w\s\(\)]+)\s\$\s(.+)/g;

    const parsedDialogues: Array<{
      id: number;
      type: "narrator" | "character" | "normal";
      character?: string;
      text: string;
      avatar?: string;
    }> = [];

    let match;
    let id = 0;

    let lastIndex = 0; // Track the last processed index in the story string

    while ((match = dialogueRegex.exec(story)) !== null) {
      const [fullMatch, narrator, character, dialogue] = match;

      // Capture any text between the last match and this match as normal text
      if (lastIndex < match.index) {
        const normalText = story.substring(lastIndex, match.index).trim();
        if (normalText) {
          parsedDialogues.push({
            id: id++,
            type: "normal",
            text: normalText,
          });
        }
      }

      if (narrator) {
        // Narrator text (e.g., [ text ])
        parsedDialogues.push({
          id: id++,
          type: "narrator",
          text: narrator.trim(),
        });
      } else if (character) {
        const trimmedCharacter = character.trim();

        // Assign avatar globally if not already assigned
        if (!avatarMapRef.current[trimmedCharacter]) {
          const randomAvatar = avatarPool[Math.floor(Math.random() * avatarPool.length)];
          avatarMapRef.current[trimmedCharacter] = randomAvatar;
        }

        parsedDialogues.push({
          id: id++,
          type: "character",
          character: trimmedCharacter,
          text: dialogue.trim(),
          avatar: avatarMapRef.current[trimmedCharacter],
        });
      }

      // Update the last index to the end of the current match
      lastIndex = match.index + fullMatch.length;
    }

    // Capture any remaining text after the last match
    if (lastIndex < story.length) {
      const remainingText = story.substring(lastIndex).trim();
      if (remainingText) {
        parsedDialogues.push({
          id: id++,
          type: "normal",
          text: remainingText,
        });
      }
    }

    return parsedDialogues;
  };

  return (
    <>
      {stories.map((story, i) => {
        const generatedImage = roomData.generatedImages[i];
        const parsedDialogues = assignAvatars(story);

        return (
          <div
            key={i}
            className="flex w-full flex-col gap-6 rounded-md bg-primary-900 p-6 lg:gap-10 lg:p-8"
          >
            <div className="flex w-full items-center gap-1.5 lg:gap-3">
              <div className="size-2 shrink-0 rotate-45 bg-white max-lg:hidden" />
              <p
                className="mt-0.5 line-clamp-2 max-w-full text-2xl font-semibold uppercase tracking-[0.2em] max-lg:hidden"
                style={jibril.style}
              >
                <span className="whitespace-nowrap text-white/40">
                  ROUND {i + 1}/{roomData.maxRounds + 1}
                </span>
              </p>
              <p className="mt-0.5 max-w-full font-semibold uppercase tracking-tight lg:hidden">
                <span className="whitespace-nowrap text-white/30">
                  ROUND {i + 1}/{roomData.maxRounds + 1}
                </span>
              </p>
              <div className="size-2 shrink-0 rotate-45 bg-white max-lg:hidden" />
            </div>

            <div className="w-full">
              {/* Image with enhanced styling */}
              {roomData.generateImages && (
                <div className="mb-8 flex justify-center md:float-right md:ml-4 md:w-auto lg:max-w-[40%]">
                  {/* Decorative frame container */}
                  <div className="relative">
                    {/* Background decorative elements */}
                    <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-lg" />
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20" />

                    {/* Main image container with border */}
                    <div className="relative flex aspect-video h-40 w-40 justify-center overflow-hidden sm:h-60 sm:w-60 lg:aspect-square lg:h-96 lg:w-96">
                      {generatedImage && generatedImage.length > 0 ? (
                        <div className="group relative w-full">
                          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-75" />
                          <img
                            className="relative h-full w-full rounded-lg bg-red-600 object-cover shadow-lg"
                            src={generatedImage}
                            alt="Generated"
                          />
                          {/* Subtle shine effect */}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                        </div>
                      ) : (
                        <div className="relative w-full">
                          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-75" />
                          <div className="relative flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-gray-600 shadow-lg">
                            <SkeletonIcon className="h-16 w-16 text-gray-200" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Text content - unchanged */}
              <div className="tracking-widest lg:text-[24px] lg:leading-10">
                {roomData.generateAudio && (
                  <div className="mb-4 w-full">
                    <StyledAudio audio={roomData.generatedAudio[i]} />
                  </div>
                )}

                {parsedDialogues.map((dialogue) => {
                  if (dialogue.type === "narrator") {
                    return (
                      <div
                        key={dialogue.id}
                        className="mb-4 text-xl font-semibold italic text-blue-300"
                      >
                        [{dialogue.text}]
                      </div>
                    );
                  } else if (dialogue.type === "character") {
                    return (
                      <div key={dialogue.id} className="mb-4 flex items-end gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={dialogue.avatar}
                            alt={dialogue.character}
                            className="h-12 w-12 rounded-full"
                          />
                        </div>
                        <div className="relative">
                          <div className="relative rounded-2xl bg-primary-800 px-4 py-3 text-primary-100 shadow-sm">
                            <div className="mb-1 font-bold text-orange-400">
                              {dialogue.character}
                            </div>
                            <Markdown>{dialogue.text}</Markdown>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <Markdown
                        key={dialogue.id}
                        className="mb-4 text-xl font-semibold italic text-blue-300"
                      >
                        {dialogue.text}
                      </Markdown>
                    );
                  }
                })}
              </div>

              <div className="clear-both" />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Stories;
