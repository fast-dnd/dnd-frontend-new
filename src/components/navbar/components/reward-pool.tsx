import Image from "next/image";

import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { cn } from "@/utils/style-utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

const RewardPool = () => {
  const { data: currentCommunity } = useGetCurrentCommunity();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {currentCommunity && (
            <button
              className={cn(
                "z-20 flex h-[70px] cursor-default items-center gap-2 rounded-full border-2 border-[#7c692e] bg-gradient-to-r from-[#FBBC05] from-10% via-[#977000] via-50% to-[#473500] to-90% p-2 pr-6 transition-all duration-200 hover:bg-neutral-800 hover:shadow-[0px_0px_30px_0px_#FBBC0540] active:opacity-90",
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
                  1000 {currentCommunity?.currencyName}
                  {/* TODO: replace with reward pool size */}
                </div>
              </div>
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="w-56 tracking-[1.02px]">
          The 10 top players on the scoreboard will receive rewards from the reward pool.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RewardPool;
