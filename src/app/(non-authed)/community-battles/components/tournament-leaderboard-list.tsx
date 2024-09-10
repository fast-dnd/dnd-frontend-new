/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { InfiniteData } from "@tanstack/react-query";

import Spinner from "@/components/ui/spinner";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import { cn } from "@/utils/style-utils";
import { ILeaderBoard } from "@/validations/leaderboard";

import useGetTournamentLeaderboard from "../hooks/use-get-leaderboard";

const TournamentLeaderboardList = ({ communityId }: { communityId: string }) => {
  const previousRef = useRef<InfiniteData<ILeaderBoard>>();
  const scrollableRef = useRef<HTMLDivElement>(null);

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
  } = useGetTournamentLeaderboard({
    communityId,
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
      const numOfUsers = leaderboardData.pages[0].leaderboard.length;
      scrollableRef.current.scrollTop += numOfUsers * 52; // each leaderboard user is 52px
    }
    previousRef.current = leaderboardData;
  }, [leaderboardData]);

  if (isLoading)
    return (
      <div className="flex animate-pulse flex-col">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex w-full justify-between bg-black/20 p-2">
            <div className="flex items-center gap-4">
              <div className="size-2 rounded-lg bg-gray-600" />

              <div className="size-9 rounded-full bg-gray-600" />
              <div className="h-5 w-32 rounded-full bg-gray-600" />
            </div>
            <div className="size-5 rounded-lg bg-gray-600" />
          </div>
        ))}
      </div>
    );

  if (isError) return <div>Something went wrong</div>;

  const content = (
    <div className="h-full w-full flex-grow flex-col items-center px-1">
      <div className=" w-full overflow-y-auto">
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 0.5em",
          }}
          className="h-full w-full min-w-full table-auto  text-left text-white"
        >
          <thead
            style={{
              backgroundColor: "#252525",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <tr>
              <th style={{ padding: "16px" }}>Rank</th>
              <th style={{ padding: "16px" }}>User</th>
              <th style={{ padding: "16px" }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.pages.flatMap((page, pageIndex) =>
              page.leaderboard.map((leaderboardUser, userIndex) => {
                const overallIndex = pageIndex * page.leaderboard.length + userIndex + 1;
                const isLastItem =
                  pageIndex === leaderboardData.pages.length - 1 &&
                  userIndex === page.leaderboard.length - 1;

                return (
                  <tr
                    key={leaderboardUser.accountId}
                    style={{
                      backgroundColor: "#2d2d2d",
                      transition: "background-color 0.3s ease",
                      borderRadius: "10px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3a")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d2d2d")}
                    ref={isLastItem ? lastLeaderboardUserRef : null} // Use the ref here
                  >
                    <td style={{ padding: "16px", fontSize: "1.25rem", fontWeight: "600" }}>
                      {overallIndex}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={leaderboardUser.imageUrl || "/images/default-avatar.png"}
                          alt={leaderboardUser.username}
                          style={{
                            height: "48px",
                            width: "48px",
                            borderRadius: "50%",
                            transition: "transform 0.3s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                        <span style={{ fontSize: "1.1rem" }}>{leaderboardUser.username}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px", fontSize: "1.1rem", fontWeight: "600" }}>
                      {leaderboardUser.rating}
                    </td>
                  </tr>
                );
              }),
            )}

            {/* Render placeholders if there are fewer than 10 users */}
            {Array.from({
              length: Math.max(
                0,
                10 - leaderboardData?.pages.flatMap((page) => page.leaderboard).length,
              ),
            }).map((_, index) => (
              <tr
                key={`placeholder-${index}`}
                style={{
                  backgroundColor: "#2d2d2d",
                  transition: "background-color 0.3s ease",
                  borderRadius: "10px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d2d2d")}
              >
                <td style={{ padding: "16px" }}>
                  {leaderboardData?.pages.flatMap((page) => page.leaderboard).length + index + 1}
                </td>
                <td style={{ padding: "16px" }}>
                  <div
                    style={{
                      height: "48px",
                      width: "48px",
                      backgroundColor: "#3a3a3a",
                      borderRadius: "50%",
                    }}
                  ></div>
                </td>
                <td style={{ padding: "16px" }}>
                  <div style={{ height: "16px", width: "100%", backgroundColor: "#3a3a3a" }}></div>
                </td>
              </tr>
            ))}

            {/* Spinner for loading more data */}
            {isFetchingNextPage && (
              <tr
                style={{
                  backgroundColor: "#2d2d2d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d2d2d")}
              >
                <td style={{ padding: "16px", textAlign: "center" }}>
                  <Spinner className="m-0 size-8" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={cn("relative flex h-full min-h-screen flex-1 flex-col overflow-hidden")}>
      <div
        className={cn("flex h-full min-h-screen flex-1 flex-col overflow-y-auto overscroll-auto  ")}
        ref={scrollableRef}
      >
        {content}
        {isFetchingNextPage && (
          <div className="flex h-10 justify-center">
            <Spinner className="m-0 size-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentLeaderboardList;
