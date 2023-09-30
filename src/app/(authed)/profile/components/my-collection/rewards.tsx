import React from "react";
import Image from "next/image";
import { Lock } from "iconsax-react";

import { IReward } from "@/types/reward";
import { cn } from "@/utils/style-utils";
import useGetRewards from "@/hooks/use-get-rewards";

interface IRewardProps {
  selectedReward?: string;
  onSelectReward?: (reward: IReward) => void;
}

const Rewards = ({ selectedReward, onSelectReward }: IRewardProps) => {
  const { data: rewards, isLoading } = useGetRewards();

  if (isLoading) return <div>Loading...</div>;

  if (!rewards) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <p>Unlocked {rewards.length}/50</p>
      <div className="grid grid-cols-4 gap-7">
        {rewards.map((reward) => (
          <div key={reward._id} className="flex flex-col gap-2">
            <div className="relative h-[170px] w-[290px]">
              <Image
                src={reward.url}
                alt={reward.name ?? ""}
                width={270}
                height={150}
                className={cn(
                  "h-full w-full rounded-md",
                  selectedReward === reward.url && "border-2 border-primary",
                )}
                onClick={() => onSelectReward?.(reward)}
              />
              {selectedReward === reward.url && (
                <div className="absolute right-10 top-10 bg-primary px-2 py-1">Equipped</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xl uppercase">{reward.name}</p>
              <div className="flex items-center gap-2 rounded-md border border-white/25 px-2 py-1">
                <p className="text-xl">{reward.rarity}</p>
              </div>
            </div>
          </div>
        ))}
        {Array.from({ length: 50 - rewards.length }).map((_, index) => (
          <div key={index} className="relative h-[170px] w-[290px] overflow-hidden">
            <Image
              src="/images/reward-locked.png"
              alt={`Locked reward ${index + 1}`}
              width={270}
              height={150}
              className="h-full w-full rounded-md blur-lg"
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
