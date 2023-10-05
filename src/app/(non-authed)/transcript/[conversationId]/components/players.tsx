import React from "react";
import Image from "next/image";

import { ITranscriptPlayer } from "@/types/transcript";

export function Players({ players }: { players: ITranscriptPlayer[] }) {
  return (
    <div className="flex flex-col gap-7">
      <p className="text-xl uppercase tracking-[2px]">Players</p>
      <div className="flex gap-6 border-b border-b-white/20 pb-4">
        {players.map((player) => (
          <div key={player.accountId} className="flex items-center gap-2 text-xl">
            <Image
              src={player.imageUrl || "/images/default-avatar.png"}
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
  );
}
