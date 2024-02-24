import React from "react";
import Image from "next/image";

import useGetTokenAccountBalance from "@/hooks/helpers/use-get-token-account-balance";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useOnWithdrawAdventureCurrency from "@/hooks/mutations/use-withdraw-adventure-currency";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import { IDungeon } from "@/types/dungeon";

const Web3 = () => {
  const {
    data: adventuresData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDungeons({ filter: "owned" });

  const { lastObjectRef: lastAdventureRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (!adventuresData) return null;

  const content = adventuresData.pages.map((page) =>
    page.dungeons.map((adventure, i) => {
      if (page.dungeons.length === i + 1) {
        return <AdventureClaim adventure={adventure} key={adventure._id} ref={lastAdventureRef} />;
      }
      return <AdventureClaim adventure={adventure} key={adventure._id} />;
    }),
  );

  return <div className="flex max-h-[300px] flex-col gap-8 overflow-auto">{content}</div>;
};

export default Web3;

const AdventureClaim = React.forwardRef<HTMLDivElement, { adventure: IDungeon }>(
  ({ adventure }, ref) => {
    const { data: currentCommunity } = useGetCurrentCommunity();

    const adventureBalance = useGetTokenAccountBalance(adventure.adventureTreasuryAddress ?? "");

    const { onWithdrawAdventureCurrency } = useOnWithdrawAdventureCurrency({
      amount: adventureBalance,
      dungeonId: adventure._id,
    });

    if (adventureBalance === 0) return null;

    return (
      <div className="flex w-full items-center justify-between" ref={ref}>
        <div className="flex gap-2">
          <Image
            alt={adventure.name}
            src={adventure.imageUrl || "/images/default-dungeon.png"}
            width={67}
            height={67}
            className="aspect-square size-[67px] w-full rounded-lg"
          />
          <div className="flex flex-col justify-between gap-1">
            <p className="text-2xl font-bold">{adventure.name}</p>
            <p className="whitespace-nowrap text-lg">
              Withdraw {adventureBalance} {currentCommunity?.currencyName}
            </p>
          </div>
        </div>
        <button
          className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition-all duration-200 hover:opacity-75"
          onClick={onWithdrawAdventureCurrency}
        >
          CLAIM
        </button>
      </div>
    );
  },
);

AdventureClaim.displayName = "AdventureClaim";
