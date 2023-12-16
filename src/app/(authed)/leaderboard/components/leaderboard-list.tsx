import { useEffect, useRef } from "react";
import { CaretDoubleDown } from "@phosphor-icons/react";
import { InfiniteData } from "@tanstack/react-query";

import Spinner from "@/components/ui/spinner";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetRating from "@/hooks/queries/use-get-rating";
import { cn } from "@/utils/style-utils";
import { ILeaderBoard } from "@/validations/leaderboard";

import useGetLeaderboard from "../hooks/use-get-leaderboard";
import { RatingType } from "../types/rating-type";
import LeaderboardUserCard from "./leaderboard-user";

const LeaderboardList = ({ selectedRating }: { selectedRating: RatingType }) => {
  const { data: rating, isLoading: isLoadingRating } = useGetRating();

  const previousRef = useRef<InfiniteData<ILeaderBoard>>();

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
    currUserRank: rating?.rating[selectedRating],
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
      leaderboardData &&
      leaderboardData?.pages?.[0].leaderboard?.[0]?.accountId !==
        previousRef.current?.pages?.[0]?.leaderboard?.[0]?.accountId &&
      scrollableRef.current
    ) {
      //prevent scrolling to top when loaded previous
      const numOfUsers = leaderboardData.pages[0].leaderboard.filter(
        (user) => user.rank > 3,
      ).length;
      scrollableRef.current.scrollTop += numOfUsers * 52; // each leaderboard user is 52px
    }

    previousRef.current = leaderboardData;
  }, [leaderboardData]);

  if (isLoadingRating || isLoading || topIsLoading)
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

  if (!rating || isError || topIsError) return <div>Something went wrong</div>;

  const topContent = topLeaderboardData?.pages[0].leaderboard
    .slice(0, 3)
    .map((leaderboardUser) => (
      <LeaderboardUserCard
        key={leaderboardUser.accountId}
        leaderboardUser={leaderboardUser}
        isCurrUser={leaderboardUser.accountId === rating.accountId}
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
              isCurrUser={leaderboardUser.accountId === rating.accountId}
            />
          );
        }
      }
      if (index === leaderboardData.pages.length - 1) {
        if (page.leaderboard.length - 1 === i) {
          return (
            <LeaderboardUserCard
              key={leaderboardUser.accountId}
              leaderboardUser={leaderboardUser}
              ref={lastLeaderboardUserRef}
              isCurrUser={leaderboardUser.accountId === rating.accountId}
            />
          );
        }
      }

      return (
        <LeaderboardUserCard
          leaderboardUser={leaderboardUser}
          key={leaderboardUser.accountId}
          isCurrUser={leaderboardUser.accountId === rating.accountId}
        />
      );
    }),
  );

  return (
    <div className={cn("relative flex h-full min-h-0 flex-1 flex-col overflow-hidden")}>
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
      <div className="absolute bottom-0 left-1/2 z-20 flex flex-col items-center gap-1">
        <CaretDoubleDown size={10} color="#fff" weight="bold" />
        <p className="text-xs font-medium">{leaderboardData.pages[0].total}</p>
      </div>
      <div className="pointer-events-none fixed bottom-4 h-16 w-full bg-gradient-to-t from-dark-900 to-transparent lg:h-32 lg:w-[calc(100%-4rem)]" />
    </div>
  );
};

export default LeaderboardList;
