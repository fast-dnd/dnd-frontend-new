/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { InfiniteData } from "@tanstack/react-query";

import OraAiViewBoxPromptModal from "@/components/common/ora-network-modal/aibox-view-prompt-modal";
import Spinner from "@/components/ui/spinner";
import useAuth from "@/hooks/helpers/use-auth";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import chainService from "@/services/chain-service";
// import { cn } from "@/utils/style-utils";
import { ILeaderBoard } from "@/validations/leaderboard";

import useGetAiBoxLeaderboard from "../hooks/use-get-leaderboard";

const BoxLeaderboardList = ({
  epoch,
  lastRefetch,
  verifiable,
  boxId,
  onUserRankDataFetched,
}: {
  epoch: number;
  lastRefetch: number;
  verifiable: boolean;
  boxId?: string;
  onUserRankDataFetched: Function;
}) => {
  const previousRef = useRef<InfiniteData<ILeaderBoard>>();
  const scrollableRef = useRef<HTMLDivElement>(null);

  const { loggedIn } = useAuth();

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
    refetch,
  } = useGetAiBoxLeaderboard({
    epoch,
    boxId,
  });

  useEffect(() => {
    refetch();
  }, [epoch, lastRefetch, refetch]);

  useEffect(() => {
    if (leaderboardData) {
      onUserRankDataFetched(leaderboardData.pages?.[0]);
    }
  }, [epoch, lastRefetch, refetch, leaderboardData]);

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
      const numOfUsers = leaderboardData.pages[0].leaderboard.length;
      scrollableRef.current.scrollTop += numOfUsers * 52;
    }
    previousRef.current = leaderboardData;
  }, [leaderboardData]);

  if (isLoading)
    return (
      <div className="flex flex-col space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex w-full justify-between space-x-4 bg-black/20 p-2">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gray-600" />
              <div className="h-9 w-9 rounded-full bg-gray-600" />
              <div className="h-5 w-20 rounded-full bg-gray-600" />
            </div>
            <div className="h-5 w-10 rounded-lg bg-gray-600" />
          </div>
        ))}
      </div>
    );

  if (isError) return <div>Something went wrong</div>;

  const content = (
    <div className="flex w-full flex-1 flex-col items-center px-1">
      <div
        className="w-full flex-1 overflow-y-auto"
        style={{ maxHeight: "600px" }}
        ref={scrollableRef}
      >
        <table className="mb-2 w-full table-auto text-left text-white">
          <thead className="sticky top-0 z-20 bg-[#1a1d2e] text-xs font-bold uppercase text-white sm:text-sm">
            <tr>
              <th className="px-2 py-1 sm:px-4 sm:py-2">Rank</th>
              <th className="px-2 py-1 sm:px-4 sm:py-2">User</th>
              <th className="px-2 py-1 sm:px-4 sm:py-2">Transaction</th>
              <th className="px-2 py-1 sm:px-4 sm:py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.pages.flatMap((page, pageIndex) =>
              page.leaderboard.map((leaderboardUser, userIndex) => {
                const overallIndex =
                  leaderboardData.pages
                    .slice(0, pageIndex)
                    .reduce((acc, p) => acc + p.leaderboard.length, 0) +
                  userIndex +
                  1;

                const isLastItem =
                  pageIndex === leaderboardData.pages.length - 1 &&
                  userIndex === page.leaderboard.length - 1;

                return (
                  <tr
                    key={leaderboardUser.accountId}
                    ref={isLastItem ? lastLeaderboardUserRef : null}
                    className="border-b border-gray-700"
                  >
                    <td className="px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base">
                      {overallIndex}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <img
                          src={leaderboardUser.imageUrl || "/images/default-avatar.png"}
                          alt={leaderboardUser.username}
                          className="h-8 w-8 rounded-full sm:h-12 sm:w-12"
                        />
                        <span className="text-xs sm:text-lg">{leaderboardUser.username}</span>
                      </div>
                    </td>
                    <td className="flex items-center space-x-2 px-2 py-1 text-xs font-semibold sm:p-4 sm:text-base">
                      {leaderboardUser.transactions && leaderboardUser.transactions.length > 0 ? (
                        <>
                          <img
                            src={getChainImage(
                              leaderboardUser.transactions[0].chain as NetworkName,
                            )}
                            className="h-4 sm:h-6"
                            alt="Chain Icon"
                          />
                          <a
                            href={`${chainService.getExplorerUrl(
                              leaderboardUser.transactions[0].chain,
                            )}${leaderboardUser.transactions[0].txHash}#eventlog`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:underline"
                          >
                            {`${leaderboardUser.transactions[0].txHash.slice(
                              0,
                              3,
                            )}...${leaderboardUser.transactions[0].txHash.slice(-3)}`}
                          </a>
                        </>
                      ) : (
                        <span className="text-xs text-gray-500 sm:text-base">
                          {verifiable ? (
                            "No transactions"
                          ) : (
                            <OraAiViewBoxPromptModal
                              username={leaderboardUser.username}
                              userImageUrl={leaderboardUser.imageUrl}
                              boxId={boxId}
                              userId={leaderboardUser.accountId}
                            />
                          )}
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base">
                      {leaderboardUser.rating}
                    </td>
                  </tr>
                );
              }),
            )}

            {Array.from({
              length: Math.max(
                0,
                10 - leaderboardData?.pages.flatMap((page) => page.leaderboard).length,
              ),
            }).map((_, index) => (
              <tr key={`placeholder-${index}`} className="border-b border-gray-700 ">
                <td className="px-2 py-1 sm:px-4 sm:py-2">
                  {leaderboardData?.pages.flatMap((page) => page.leaderboard).length + index + 1}
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-2">
                  <div className="h-8 w-8 rounded-full  sm:h-12 sm:w-12"></div>
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-2">
                  <div className="h-4 w-full rounded-full "></div>
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-2">
                  <div className="h-4 w-full rounded-full "></div>
                </td>
              </tr>
            ))}

            {isFetchingNextPage && (
              <tr className="border-b border-gray-700">
                <td colSpan={4} className="px-4 py-2 text-center">
                  <Spinner className="m-0 h-4 sm:h-8" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden p-2 sm:p-4">
      <div className="flex flex-1 flex-col overscroll-auto" ref={scrollableRef}>
        {content}
        {isFetchingNextPage && (
          <div className="flex h-8 justify-center sm:h-10">
            <Spinner className="m-0 h-4 sm:h-8" />
          </div>
        )}
      </div>
    </div>
  );
};

type NetworkName =
  | "Arbitrum"
  | "ArbitrumSepoliaTestnet"
  | "Linea"
  // | "Optimism"
  // | "Optimism Sepolia"
  | "Polygon";
// | "Mantle";

const getChainImage = (chainName: NetworkName) => {
  switch (chainName) {
    case "Arbitrum":
    case "ArbitrumSepoliaTestnet":
      return "/images/logos/arbitrum-arb-logo.png";
    case "Linea":
      return "/images/logos/linea-logo.png";
    // case "Optimism":
    // return "/images/logos/optimism.png";
    // case "Optimism Sepolia":
    // return "/images/logos/optimism.png";
    case "Polygon":
      return "/images/logos/polygon.png";
    // case "Mantle":
    // return "/images/logos/mantle-logo.png";
    default:
      return "/images/logos/default-logo.png"; // A default image if chain is unrecognized
  }
};

export default BoxLeaderboardList;
