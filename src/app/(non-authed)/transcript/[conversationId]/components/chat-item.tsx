"use client";

import Image from "next/image";
import { Game } from "iconsax-react";
import { FaDice } from "react-icons/fa";

import { ITranscriptPlayer } from "@/types/transcript";
import { cn } from "@/utils/style-utils";

interface IChatItemProps {
  player?: ITranscriptPlayer;
  text: string;
  dice?: number;
}

const ChatItem = ({ player, text, dice }: IChatItemProps) => {
  return (
    <div className="flex flex-col gap-4 max-lg:px-4">
      <div className="ml-3 flex items-center gap-2">
        {player ? (
          <>
            <Image
              src={player.imageUrl || "/images/default-avatar.png"}
              width={32}
              height={32}
              alt={`${player.name}'s avatar`}
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <span className="font-semibold">{player.name}</span>
          </>
        ) : (
          <>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-white bg-primary pb-1">
              <Game variant="Bold" size={24} />
            </div>
            <span className="font-semibold text-primary">Bob Thought</span>
          </>
        )}
      </div>
      <div
        className={cn(
          "relative mt-2 flex w-full flex-col gap-2 rounded-md p-4 font-light",
          player ? "bg-white text-black" : "bg-primary text-white",
        )}
      >
        <div
          className={cn(
            "absolute left-5 top-0 h-4 w-4 -translate-y-1/2 rotate-45",
            player ? "bg-white" : "bg-primary",
          )}
        />
        {text}
        {dice && (
          <div className="flex items-center gap-1 font-medium text-primary">
            <FaDice className="min-h-[14px] min-w-[22px] fill-primary" />
            Rolled: {dice}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
