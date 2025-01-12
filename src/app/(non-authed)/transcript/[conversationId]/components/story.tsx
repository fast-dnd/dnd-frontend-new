/* eslint-disable @next/next/no-img-element */
"use client";

import Markdown from "react-markdown";

import { ITranscript, ITranscriptStory } from "@/types/transcript";

import ChatItem from "./chat-item";
import ImageModal from "./image-modal";

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

const Story = ({
  story,
  transcripts,
  avatarMapRef,
}: {
  story: ITranscriptStory;
  transcripts: ITranscript;
  avatarMapRef: React.MutableRefObject<Record<string, string>>;
}) => {
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

  const parsedDialogues = assignAvatars(story.storyChunk);

  return (
    <div className="flex flex-col gap-6 rounded-md bg-dark-900 p-1 pb-6 lg:p-8">
      {story.image && <ImageModal image={story.image} />}
      <div className="flex flex-col gap-6 max-lg:px-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold lg:text-4xl">{story.title}</p>
        </div>

        <div className="space-y-4">
          {parsedDialogues.map((dialogue: any) => {
            if (dialogue.type === "narrator") {
              return (
                <div key={dialogue.id} className="text-xl font-semibold italic text-blue-300">
                  [{dialogue.text}]
                </div>
              );
            } else if (dialogue.type === "character") {
              return (
                <div key={dialogue.id} className="flex w-full items-end gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={dialogue.avatar}
                      alt={dialogue.character}
                      className="h-12 w-12 rounded-full"
                    />
                  </div>

                  {/* Chat bubble */}
                  <div className="relative max-w-[75%]">
                    <div className="relative rounded-2xl bg-primary-800 px-4 py-3 text-primary-100 shadow-sm">
                      {/* Message text */}
                      <div className="mb-1 font-bold text-orange-400">{dialogue.character}</div>
                      <Markdown>{dialogue.text}</Markdown>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <Markdown key={dialogue.id} className="text-xl font-semibold italic text-blue-300">
                  {dialogue.text}
                </Markdown>
              );
            }
          })}
        </div>
      </div>

      {story.question && story.answer && story.playerAsking && (
        <>
          <ChatItem playerAsking={story.playerAsking} text={story.question} />
          <ChatItem text={story.answer} />
        </>
      )}

      {story.movesInRound?.map((move) => {
        const player = transcripts.players.find(
          (player) => player.accountId === move.playerAccountId,
        );

        if (!player) return null;
        return (
          <ChatItem key={player.accountId} player={player} text={move.action} dice={move.dice} />
        );
      })}
    </div>
  );
};

export default Story;
