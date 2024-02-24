import React from "react";
import Image from "next/image";
import { Lock } from "iconsax-react";

import useGetRewards from "@/hooks/queries/use-get-rewards";
import { IReward } from "@/types/reward";
import { cn } from "@/utils/style-utils";

interface IRewardProps {
  selectedReward?: IReward;
  onSelectReward?: (reward: IReward) => void;
}

const Rewards = ({ selectedReward, onSelectReward }: IRewardProps) => {
  const { data: rewards, isLoading } = useGetRewards();

  if (!isLoading && !rewards) return <div>Something went wrong</div>;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 overflow-y-auto overflow-x-hidden pr-4",
        !rewards && "animate-pulse",
      )}
    >
      <p>Unlocked {rewards?.length ?? "~"}/50</p>
      <div className="grid grid-cols-2 gap-7 lg:grid-cols-4">
        {rewards?.map((reward) => (
          <div key={reward._id} className="flex flex-col gap-2">
            <div className="relative aspect-[1.7] w-[500px] max-w-full rounded-md">
              <Image
                src={reward.url}
                alt={reward.name ?? ""}
                width={270}
                height={150}
                className={cn(
                  "size-full rounded-md",
                  selectedReward?._id === reward._id && "border-2 border-primary",
                )}
                onClick={() => onSelectReward?.(reward)}
              />
              {selectedReward?._id === reward._id && (
                <div className="absolute right-2 top-2 bg-primary px-2 py-1">Equipped</div>
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-between max-lg:gap-2 lg:flex-row lg:items-center">
              <p className="text-sm uppercase lg:text-xl">{reward.name}</p>
              <div className="flex items-center gap-2 rounded-md border border-white/25 px-2 py-1">
                <p className="text-xs lg:text-xl">{reward.rarity}</p>
              </div>
            </div>
          </div>
        ))}
        {Array.from({ length: 50 - (rewards?.length ?? 0) }).map((_, index) => (
          <div
            key={index}
            className="relative aspect-[1.7] w-[500px] max-w-full overflow-hidden rounded-md"
          >
            <Image
              src="/images/reward-locked.png"
              alt={`Locked reward ${index + 1}`}
              width={270}
              height={150}
              className="size-full rounded-md blur-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock variant="Bold" size={60} className="opacity-50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
