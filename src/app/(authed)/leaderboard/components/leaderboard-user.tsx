import React from "react";
import Image from "next/image";
import { Medal } from "@phosphor-icons/react";

import { LeaderboardUser } from "@/types/leaderboard";
import { cn } from "@/utils/style-utils";

const LeaderboardUserCard = React.forwardRef<
  HTMLDivElement,
  { leaderboardUser: LeaderboardUser; isCurrUser: boolean; top3?: boolean }
>(({ leaderboardUser, isCurrUser, top3 }, ref) => {
  const medalColor = (rank: number) => {
    if (rank === 1) return "#FFCB3F";
    if (rank === 2) return "#DDD9CE";
    if (rank === 3) return "#F09169";

    return "#DDD9CE";
  };

  return (
    <div
      className={cn(
        "relative flex w-full justify-between px-4 py-2",
        isCurrUser && "bg-black/20",
        top3 && "bg-black",
      )}
      ref={ref}
    >
      {isCurrUser && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 border-y-[4px] border-l-[5px] border-y-transparent border-l-white" />
      )}
      <div className={cn("flex items-center gap-4", top3 ? "gap-2" : "pl-2")}>
        {top3 ? (
          <Medal size={24} weight="fill" color={medalColor(leaderboardUser.rank)} />
        ) : (
          <p className="font-medium">{leaderboardUser.rank}</p>
        )}
        <Image
          src={leaderboardUser.imageUrl || "/images/default-avatar.png"}
          width={36}
          height={36}
          alt={`player-${leaderboardUser.accountId}-avatar`}
          className="size-[36px] rounded-full border-2 border-white/30"
        />
        <p className={cn("font-light", !top3 && "-ml-2")}>
          {leaderboardUser.walletAddress
            ? leaderboardUser.walletAddress.slice(0, 3) +
              "..." +
              leaderboardUser.walletAddress.slice(-3)
            : leaderboardUser.username}
        </p>
      </div>
      <p className="text-lg font-bold">{leaderboardUser.rating}</p>
    </div>
  );
});

LeaderboardUserCard.displayName = "LeaderboardUserCard";

export default LeaderboardUserCard;
