import useAuth from "@/hooks/helpers/use-auth";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import { cn } from "@/utils/style-utils";

import useGetLeaderboard from "../hooks/use-get-leaderboard";
import { RatingType } from "../types/rating-type";
import LeaderboardUserCard from "./leaderboard-user";

const LeaderboardList = ({ selectedRating }: { selectedRating: RatingType }) => {
  const { loggingIn, user } = useAuth();

  const {
    data: leaderboardData,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetLeaderboard({ filter: selectedRating });

  const { lastObjectRef: lastLeaderboardUserRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (loggingIn || isLoading)
    return (
      <div className="flex animate-pulse flex-col">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex w-full justify-between bg-black/20 p-2">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-lg bg-gray-600" />

              <div className="h-9 w-9 rounded-full bg-gray-600" />
              <div className="h-5 w-32 rounded-full bg-gray-600" />
            </div>
            <div className="h-5 w-5 rounded-lg bg-gray-600" />
          </div>
        ))}
      </div>
    );

  if (!user || isError) return <div>Something went wrong</div>;

  const content = leaderboardData?.pages.map((page) =>
    page.map((leaderboardUser, i) => {
      if (page.length === i + 1) {
        return (
          <LeaderboardUserCard
            key={leaderboardUser.accountId}
            leaderboardUser={leaderboardUser}
            ref={lastLeaderboardUserRef}
            isCurrUser={leaderboardUser.accountId === user.account._id}
          />
        );
      }
      return (
        <LeaderboardUserCard
          leaderboardUser={leaderboardUser}
          key={leaderboardUser.accountId}
          isCurrUser={leaderboardUser.accountId === user.account._id}
        />
      );
    }),
  );

  return <div className={cn("flex flex-col")}>{content}</div>;
};

export default LeaderboardList;
