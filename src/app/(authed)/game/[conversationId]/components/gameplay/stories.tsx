/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
import Markdown from "react-markdown";

import SkeletonIcon from "@/components/icons/skeleton-icon";
import useAutoScrollToBottom from "@/hooks/helpers/use-auto-scroll-to-bottom";
import { IDungeonDetail } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { jibril } from "@/utils/fonts";

import useUpdateStories from "../../hooks/use-update-stories";
import ImageModal from "../modals/image-modal";
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

const StoryList = ({ roomData, dungeonData, stories }: IStoryListProps) => {
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
    "/images/default-characters/c40.png",
    "/images/default-characters/c41.png",
  ];

  const avatarMap: Record<string, string> = {}; // Global avatar map for consistency

  const assignAvatars = (story: string) => {
    const dialogueRegex = /\[([^\]]*?)\]|([^\[]*?):\s?(.*)/g;
    const parsedDialogues: Array<{
      id: number;
      type: "narrator" | "character" | "normal";
      character?: string;
      text: string;
      avatar?: string;
    }> = [];
    let match;
    let id = 0;

    while ((match = dialogueRegex.exec(story)) !== null) {
      const [_, narrator, character, dialogue] = match;

      if (narrator) {
        // Narrator text
        parsedDialogues.push({
          id: id++,
          type: "narrator",
          text: narrator.trim(),
        });
      } else if (character && !character.toLowerCase().includes("scene")) {
        // Character dialogue
        if (!avatarMap[character.trim()]) {
          const randomAvatar = avatarPool[Math.floor(Math.random() * avatarPool.length)];
          avatarMap[character.trim()] = randomAvatar;
        }
        parsedDialogues.push({
          id: id++,
          type: "character",
          character: character.trim(),
          text: dialogue.trim(),
          avatar: avatarMap[character.trim()],
        });
      } else {
        // Normal text (e.g., contains "scene" in the character field)
        parsedDialogues.push({
          id: id++,
          type: "normal",
          text: character ? `${character}: ${dialogue}`.trim() : dialogue.trim(),
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
                <span>&zwnj; {dungeonData.locations[Math.floor(i / 2)]?.name}</span>
              </p>
              <p className="mt-0.5 max-w-full font-semibold uppercase tracking-tight lg:hidden">
                <span className="whitespace-nowrap text-white/30">
                  ROUND {i + 1}/{roomData.maxRounds + 1}
                </span>
                <span>&zwnj; {dungeonData.locations[Math.floor(i / 2)]?.name}</span>
              </p>
              <div className="size-2 shrink-0 rotate-45 bg-white max-lg:hidden" />
            </div>

            <div className="w-full">
              {roomData.generateImages && i % 2 === 0 && (
                <div className="mb-6 flex aspect-video w-full shrink-0 justify-center lg:float-left lg:mr-6 lg:inline-block lg:aspect-square lg:size-72">
                  {generatedImage && generatedImage.length > 0 ? (
                    <ImageModal image={generatedImage} />
                  ) : (
                    <div className="flex size-full animate-pulse items-center justify-center rounded bg-gray-600">
                      <SkeletonIcon className="size-24 text-gray-200" />
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-6 tracking-widest lg:text-[24px] lg:leading-10">
                {roomData.generateAudio && (
                  <div className="mb-4 max-lg:w-full">
                    <StyledAudio audio={roomData.generatedAudio[i]} />
                  </div>
                )}
                {parsedDialogues.map((dialogue) => {
                  if (dialogue.type === "narrator") {
                    return (
                      <div key={dialogue.id} className="text-secondary-300 text-lg italic">
                        [{dialogue.text}]
                      </div>
                    );
                  } else if (dialogue.type === "character") {
                    return (
                      <div key={dialogue.id} className="flex items-start space-x-6">
                        <img
                          src={dialogue.avatar}
                          alt={dialogue.character}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <span className="font-bold text-primary-200">{dialogue.character}: </span>
                          <Markdown className="text-primary-100">{dialogue.text}</Markdown>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <Markdown key={dialogue.id} className="text-lg text-primary-100">
                        {dialogue.text}
                      </Markdown>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Stories;
