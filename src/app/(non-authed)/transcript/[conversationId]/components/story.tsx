"use client";

import Markdown from "react-markdown";

import { ITranscript, ITranscriptStory } from "@/types/transcript";

import ChatItem from "./chat-item";
import ImageModal from "./image-modal";

const Story = ({ story, transcripts }: { story: ITranscriptStory; transcripts: ITranscript }) => {
  return (
    <div className="flex flex-col gap-6 rounded-md bg-dark-900 p-1 pb-6 lg:p-8">
      {story.image && <ImageModal image={story.image} />}
      <div className="flex flex-col gap-6 max-lg:px-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold lg:text-4xl">{story.title}</p>
          <Markdown className="markdown text-xl">{story.storyChunk}</Markdown>
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
