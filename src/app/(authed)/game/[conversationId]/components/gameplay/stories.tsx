/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */
// import Markdown from "react-markdown";

// import SkeletonIcon from "@/components/icons/skeleton-icon";
import useAutoScrollToBottom from "@/hooks/helpers/use-auto-scroll-to-bottom";
import { IDungeonDetail } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";

// import { jibril } from "@/utils/fonts";

import useUpdateStories from "../../hooks/use-update-stories";

// import ImageModal from "../modals/image-modal";
// import StyledAudio from "./styled-audio";

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

const StoryList = ({ stories }: IStoryListProps) => {
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
  ];

  const assignAvatars = (story: string, avatarMap: Record<string, string>) => {
    const dialogueRegex = /\[([^\]]*?)\]|([^\[]*?):\s?(.*)/g;
    const parsedDialogues: Array<{
      id: number;
      type: "narrator" | "character";
      character?: string;
      text: string;
      avatar?: string;
    }> = [];
    let match;
    let id = 0;

    while ((match = dialogueRegex.exec(story)) !== null) {
      const [_, narrator, character, dialogue] = match;

      if (narrator) {
        parsedDialogues.push({
          id: id++,
          type: "narrator",
          text: narrator.trim(),
        });
      } else if (character) {
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
      }
    }

    return parsedDialogues;
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {stories.map((story, storyIndex) => {
        const avatarMap: Record<string, string> = {}; // Temporary map for this story
        const parsedDialogues = assignAvatars(story, avatarMap);

        return (
          <div
            key={storyIndex}
            className="flex w-full flex-col gap-4 rounded-md bg-primary-900 p-4"
          >
            {parsedDialogues.map((dialogue) =>
              dialogue.type === "narrator" ? (
                <div key={dialogue.id} className="text-secondary-300 text-sm italic">
                  [{dialogue.text}]
                </div>
              ) : (
                <div key={dialogue.id} className="flex items-center space-x-4">
                  <img
                    src={dialogue.avatar}
                    alt={dialogue.character}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <span className="font-bold text-primary-200">{dialogue.character}: </span>
                    <span className="text-primary-100">{dialogue.text}</span>
                  </div>
                </div>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
