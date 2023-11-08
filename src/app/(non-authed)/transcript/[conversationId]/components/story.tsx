"use client";

import Image from "next/image";

import { ITranscript, ITranscriptStory } from "@/types/transcript";

import ChatItem from "./chat-item";

const Story = ({ story, transcripts }: { story: ITranscriptStory; transcripts: ITranscript }) => {
  return (
    <div className="flex flex-col gap-6 rounded-md bg-black p-1 pb-6 lg:p-8">
      {story.image && (
        <Image
          src={story.image || "/images/default-dungeon.png"}
          width={100}
          height={100}
          alt={`${story.title}'s image`}
          className="h-44 w-full rounded-md lg:h-56"
        />
      )}
      <div className="flex flex-col gap-6 max-lg:px-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold lg:text-2xl">{story.title}</p>
          <p className="font-light leading-4 lg:leading-5">{story.storyChunk}</p>
        </div>
      </div>

      {story.movesInRound?.map((move) => {
        const player = transcripts.players.find(
          (player) => player.accountId === move.playerAccountId,
        );
        if (!player) return null;
        return <ChatItem key={player.accountId} player={player} text={move.action} />;
      })}

      {story.question && story.answer && story.playerAsking && <ChatItem text={story.answer} />}
    </div>
  );
};

export default Story;
