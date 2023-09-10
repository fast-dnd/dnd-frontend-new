import React from "react";
import Image from "next/image";
import { Lock } from "iconsax-react";

import useGetRewards from "@/app/(authed)/home/hooks/use-get-rewards";

const Rewards = () => {
  const { data: rewards, isLoading } = useGetRewards();

  if (isLoading) return <div>Loading...</div>;

  if (!rewards) return <div>Something went wrong</div>;

  return (
    <div className="flex h-[500px] flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <p>Unlocked {rewards.length}/50</p>
      <div className="grid grid-cols-4 gap-7">
        {rewards.map((reward) => (
          <div key={reward._id} className="flex flex-col gap-2">
            <div className="h-[170px] w-[290px]">
              <Image
                src={reward.url}
                alt={reward.name ?? ""}
                width={270}
                height={150}
                className="h-full w-full rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xl uppercase">{reward.name}</p>
              <div className="flex items-center gap-2 rounded-md border border-white/25 px-2 py-1">
                <Image
                  src={rarityIconMap[reward.rarity]}
                  alt={reward.rarity}
                  width={20}
                  height={20}
                  className="h-4 w-4"
                />
                <p className="text-xl">{reward.rarity}</p>
              </div>
            </div>
          </div>
        ))}
        {Array.from({ length: 50 - rewards.length }).map((_, index) => (
          <div key={index} className="relative h-[170px] w-[290px]">
            <Image
              src="/images/reward-locked.png"
              alt={`Locked reward ${index + 1}`}
              width={270}
              height={150}
              className="h-full w-full rounded-md blur-lg"
            />
            {/* lock icon in center of div */}
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

const rarityIconMap = {
  bronze: "/images/reward-bronze.png",
  silver: "/images/reward-bronze.png",
  gold: "/images/reward-gold.png",
  diamond: "/images/reward-diamond.png",
};
