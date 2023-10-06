import React from "react";
import Image from "next/image";

import { ITranscript } from "@/types/transcript";

import ChatWithMaster from "./chat-with-master";

const Story = ({ transcripts }: { transcripts: ITranscript }) => {
  return (
    <div className="mt-8 flex flex-col gap-10">
      {transcripts.story.map((story, index) => (
        <div key={story.storyChunk} className="flex flex-col gap-4 text-xl ">
          {story.image && (
            <div className="flex items-center justify-center">
              <Image
                src={story.image || "/images/default-dungeon.png"}
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
                    src={player.imageUrl || "/images/default-avatar.png"}
                    width={32}
                    height={32}
                    alt={`${player.name}'s avatar`}
                    className="rounded-md"
                  />
                  <span className="font-semibold text-primary">{player.name}:</span> {move.action}
                </>
              );
            })}
          </div>
          {story.question && story.answer && story.playerAsking && <ChatWithMaster story={story} />}
        </div>
      ))}
    </div>
  );
};

export default Story;
