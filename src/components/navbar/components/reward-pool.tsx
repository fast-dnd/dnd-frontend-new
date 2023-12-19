import Image from "next/image";

import { Tooltip } from "@/components/ui/tooltip";
import useGetWeb3Balance from "@/hooks/helpers/use-get-web3-balance";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { cn } from "@/utils/style-utils";

const RewardPool = () => {
  const { data: currentCommunity } = useGetCurrentCommunity();

  const rewardPoolBalance = useGetWeb3Balance({
    tokenAccountAddress: currentCommunity?.rewardPool ?? "",
    mintAddress: currentCommunity?.gameCurrency ?? "",
  });

  return (
    <Tooltip
      content="The 10 top players on the scoreboard will receive rewards from the reward pool."
      contentClassName="w-56 tracking-[1.02px] whitespace-normal"
      position="bottom"
    >
      {currentCommunity && (
        <button
          className={cn(
            "z-20 flex h-[70px] cursor-default items-center gap-2 rounded-full border-2 border-[#7c692e] bg-rewardGradient p-2 pr-6 transition-all duration-200 hover:bg-neutral-800 hover:shadow-[0px_0px_30px_0px_#FBBC0540] active:opacity-90",
          )}
        >
          <Image
            src={currentCommunity?.rewardPoolImgUrl ?? ""}
            width={45}
            height={45}
            alt={currentCommunity?.name + " reward pool image"}
            className="h-fit w-fit rounded-full"
          />
          <div className="flex flex-col justify-between font-medium">
            Reward Pool
            <div className="flex items-center gap-1 text-sm">
              <Image
                src={currentCommunity?.tokenImgUrl ?? ""}
                width={20}
                height={20}
                alt={currentCommunity?.name + " token image"}
                className="rounded-full bg-white p-1"
              />
              {rewardPoolBalance} {currentCommunity?.currencyName}
            </div>
          </div>
        </button>
      )}
    </Tooltip>
  );
};

export default RewardPool;
