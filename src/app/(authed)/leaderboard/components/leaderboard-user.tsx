import React from "react";
import Image from "next/image";

import { LeaderboardUser } from "@/types/leaderboard";

const LeaderboardUserCard = React.forwardRef<
  HTMLDivElement,
  { leaderboardUser: LeaderboardUser; isCurrUser: boolean }
>(({ leaderboardUser, isCurrUser }, ref) => {
  return (
    <div className="relative flex w-full justify-between bg-black/20 p-2" ref={ref}>
      {isCurrUser && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 border-y-[4px] border-l-[5px] border-y-transparent border-l-white" />
      )}
      <div className="flex items-center gap-4">
        <p className="font-medium">{leaderboardUser.rank}</p>
        <Image
          src={leaderboardUser.imageUrl || "/images/default-avatar.png"}
          width={36}
          height={36}
          alt={`player-${leaderboardUser.accountId}-avatar`}
          className="h-[36px] w-[36px] rounded-full border-2 border-white/30"
        />
        <p className="font-light">{leaderboardUser.username}</p>
      </div>
      <p className="text-lg font-bold">{leaderboardUser.rating}</p>
    </div>
  );
});

LeaderboardUserCard.displayName = "LeaderboardUserCard";

export default LeaderboardUserCard;
