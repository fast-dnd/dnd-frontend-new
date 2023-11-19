import { useEffect, useRef } from "react";
import { InfiniteData } from "@tanstack/react-query";

import Spinner from "@/components/ui/spinner";
import useAuth from "@/hooks/helpers/use-auth";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import { cn } from "@/utils/style-utils";
import { ILeaderBoard } from "@/validations/leaderboard";

import useGetLeaderboard from "../hooks/use-get-leaderboard";
import { RatingType } from "../types/rating-type";
import LeaderboardUserCard from "./leaderboard-user";

const LeaderboardList = ({ selectedRating }: { selectedRating: RatingType }) => {
  const { loggingIn, user } = useAuth();
  const previousRef = useRef<InfiniteData<ILeaderBoard | undefined>>();

  const scrollableRef = useRef<HTMLDivElement>(null);
  const {
    data: topLeaderboardData,
    isError: topIsError,
    isLoading: topIsLoading,
  } = useGetLeaderboard({ filter: selectedRating });

  const {
    data: leaderboardData,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useGetLeaderboard({
    filter: selectedRating,
    currUserRank: user?.ranking[selectedRating].rank,
  });

  const { lastObjectRef: lastLeaderboardUserRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  const { lastObjectRef: firstLeaderboardUserRef } = useIntersectionObserver({
    isFetchingNextPage: isFetchingPreviousPage,
    fetchNextPage: fetchPreviousPage,
    hasNextPage: hasPreviousPage,
  });

  useEffect(() => {
    if (
      leaderboardData?.pages?.[0].leaderboard[0].accountId !==
        previousRef.current?.pages?.[0]?.leaderboard[0].accountId &&
      scrollableRef.current
    ) {
      //prevent scrolling to top when loaded previous
      scrollableRef.current.scrollTop += 260; // 5 leaderboard users
    }

    previousRef.current = leaderboardData;
  }, [leaderboardData]);

  if (loggingIn || isLoading || topIsLoading)
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

  if (!user || isError || topIsError) return <div>Something went wrong</div>;

  const topContent = topLeaderboardData?.pages[0].leaderboard
    .slice(0, 3)
    .map((leaderboardUser) => (
      <LeaderboardUserCard
        key={leaderboardUser.accountId}
        leaderboardUser={leaderboardUser}
        isCurrUser={leaderboardUser.accountId === user.account._id}
        top3
      />
    ));

  const content = leaderboardData?.pages.map((page, index) =>
    page.leaderboard.map((leaderboardUser, i) => {
      if (leaderboardUser.rank <= 3) return null;
      if (index === 0) {
        if (i === 0) {
          return (
            <LeaderboardUserCard
              key={leaderboardUser.accountId}
              leaderboardUser={leaderboardUser}
              ref={firstLeaderboardUserRef}
              isCurrUser={leaderboardUser.accountId === user.account._id}
            />
          );
        }
      } else if (index === leaderboardData.pages.length - 1) {
        if (page.leaderboard.length - 1 === i) {
          return (
            <LeaderboardUserCard
              key={leaderboardUser.accountId}
              leaderboardUser={leaderboardUser}
              ref={lastLeaderboardUserRef}
              isCurrUser={leaderboardUser.accountId === user.account._id}
            />
          );
        }
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

  return (
    <div className={cn("flex h-full min-h-0 flex-1 flex-col overflow-hidden")}>
      <div className="border-b border-b-white/50">{topContent}</div>
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-auto bg-black/20 pb-4",
        )}
        ref={scrollableRef}
      >
        {content}
        {isFetchingNextPage && (
          <div className="flex h-10 justify-center">
            <Spinner className="m-0 h-8 w-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardList;
