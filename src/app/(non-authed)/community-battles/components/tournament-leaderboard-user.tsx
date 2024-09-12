import React from "react";
import Image from "next/image";

import { LeaderboardUser } from "@/types/leaderboard";
import { cn } from "@/utils/style-utils";

const TournamentLeaderboardUserCard = React.forwardRef<
  HTMLDivElement,
  { leaderboardUser: LeaderboardUser }
>(({ leaderboardUser }, ref) => {
  const medalColor = (rank: number) => {
    if (rank === 1) return "#FFCB3F";
    if (rank === 2) return "#DDD9CE";
    if (rank === 3) return "#F09169";

    return "#DDD9CE";
  };

  return (
    <div className={cn("relative flex w-full justify-between px-4 py-1")} ref={ref}>
      <div className={cn("flex items-center gap-4 pl-2")}>
        <p className="font-medium">{leaderboardUser.rank}</p>
        <Image
          src={leaderboardUser.imageUrl || "/images/default-avatar.png"}
          width={36}
          height={36}
          alt={`player-${leaderboardUser.accountId}-avatar`}
          className="size-[36px] rounded-full border-2 border-white/30"
        />
        <p className={cn("px-6 py-4 text-lg")}>{leaderboardUser.username}</p>
      </div>
      <p className="px-6 py-4 text-lg font-bold">{leaderboardUser.rating}</p>
    </div>
  );
});

TournamentLeaderboardUserCard.displayName = "LeaderboardUserCard";

export default TournamentLeaderboardUserCard;
