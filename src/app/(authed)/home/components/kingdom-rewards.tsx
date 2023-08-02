import Image from "next/image";

import Skeleton from "@/components/ui/skeleton";

import useGetRewards from "../hooks/use-get-rewards";

const KingdomRewards = () => {
  const { data: rewards, isLoading } = useGetRewards();

  if (isLoading) return <Skeleton />;

  if (!rewards) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex h-[450px] flex-col gap-4 overflow-y-auto lg:max-h-full lg:flex-1 lg:pr-8">
      {rewards.map((reward) => (
        <div
          key={reward._id}
          className="flex flex-row gap-8 rounded-md border border-white/10 p-4 pr-0 transition-all duration-300 hover:bg-white/5 lg:border-0"
        >
          <Image
            src={reward.url || "/images/default-dungeon.png"}
            alt={reward.name}
            width={256}
            height={256}
            className="h-32 w-32 lg:h-[256px] lg:w-[256px]"
          />
          <div className="flex w-full flex-col gap-1 lg:gap-4 lg:py-4">
            <p className="w-48 truncate text-xl font-normal uppercase tracking-wider lg:w-auto lg:text-[32px] lg:font-medium lg:leading-7 lg:tracking-[0.15em]">
              {reward.name}
            </p>

            <p className="w-48 truncate text-lg font-normal uppercase tracking-wider lg:w-auto lg:text-[22px] lg:font-medium lg:leading-7 lg:tracking-[0.15em]">
              {reward.rarity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KingdomRewards;
