/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { InfiniteData } from "@tanstack/react-query";

import Spinner from "@/components/ui/spinner";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import { cn } from "@/utils/style-utils";
import { ILeaderBoard } from "@/validations/leaderboard";

import useGetAiBoxLeaderboard from "../hooks/use-get-leaderboard";

const BoxLeaderboardList = ({ epoch }: { epoch: number }) => {
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
  } = useGetAiBoxLeaderboard({
    epoch,
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
      <div className="flex flex-col">
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
    <div className="w-full grow flex-col items-center px-1">
      <div className="w-full overflow-y-auto">
        <table className="mb-2 w-full table-auto text-left text-white">
          <thead className="sticky top-0 z-10  font-bold uppercase">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Transaction</th>
              <th className="px-4 py-2">Rating</th>
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
                    ref={isLastItem ? lastLeaderboardUserRef : null}
                    className="border-b border-gray-700"
                  >
                    <td className="px-4 py-2 font-semibold">{overallIndex}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-4">
                        <img
                          src={leaderboardUser.imageUrl || "/images/default-avatar.png"}
                          alt={leaderboardUser.username}
                          className="h-12 w-12 rounded-full"
                        />
                        <span className="text-lg">{leaderboardUser.username}</span>
                      </div>
                    </td>
                    <td className="flex flex-row gap-2 px-4 py-2 font-semibold">
                      {leaderboardUser.transactions && leaderboardUser.transactions.length > 0 ? (
                        <>
                          <img
                            src={getChainImage(
                              leaderboardUser.transactions[0].chain as NetworkName,
                            )}
                            // alt={leaderboardUser.transactions[0].chain}
                            style={{ height: "25px" }}
                          />
                          <a
                            href={`https://sepolia.arbiscan.io/tx/${leaderboardUser.transactions[0].txHash}#eventlog`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {`${leaderboardUser.transactions[0].txHash.slice(
                              0,
                              3,
                            )}...${leaderboardUser.transactions[0].txHash.slice(-3)}`}
                          </a>
                        </>
                      ) : (
                        <span className="text-gray-500">No transactions</span>
                      )}
                    </td>
                    <td className="px-4 py-2 font-semibold">{leaderboardUser.rating}</td>
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
              <tr key={`placeholder-${index}`} className="border-b border-gray-700">
                <td className="px-4 py-2">
                  {leaderboardData?.pages.flatMap((page) => page.leaderboard).length + index + 1}
                </td>
                <td className="px-4 py-2">
                  <div className="h-12 w-12 "></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-full"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-full "></div>
                </td>
              </tr>
            ))}

            {/* Spinner for loading more data */}
            {isFetchingNextPage && (
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2 text-center">
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
    <div className={cn("glass-effect-2", "relative flex  flex-1 flex-col overflow-hidden")}>
      <div className={cn("flex  flex-1 flex-col  overscroll-auto  ")} ref={scrollableRef}>
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

type NetworkName = "Arbitrum" | "ArbitrumSepoliaTestnet";

const getChainImage = (chainName: NetworkName) => {
  switch (chainName) {
    case "Arbitrum":
    case "ArbitrumSepoliaTestnet":
      return "/images/logos/arbitrum-arb-logo.png";
    // Add more cases here if you have other chains
    default:
      return "/images/logos/default-logo.png"; // A default image if chain is unrecognized
  }
};

export default BoxLeaderboardList;
