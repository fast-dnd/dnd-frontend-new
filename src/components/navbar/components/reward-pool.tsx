import Image from "next/image";

import { cn } from "@/utils/style-utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

const RewardPool = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "z-20 flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/20 bg-gradient-to-r from-[#FBBC05] via-[#977000] to-[#473500] p-2 pr-6 transition-all duration-200 hover:border-2 hover:bg-neutral-800 hover:shadow-[0px_0px_30px_0px_#FBBC0540] active:opacity-90",
            )}
          >
            <Image
              src={"/images/default-avatar.png"} //TODO: replace with image from community
              width={45}
              height={45}
              alt="crypto-currency-image"
              className="h-fit w-fit rounded-full"
            />
            <div className="flex flex-col justify-between font-medium">
              Reward Pool
              <div className="flex items-center gap-1 text-sm">
                <Image
                  src={"/images/default-avatar.png"} //TODO: replace with icon from community
                  width={20}
                  height={20}
                  alt="crypto-currency-icon"
                  className="rounded-full bg-white p-2"
                />
                1000 $FISHY
                {/* TODO: replace with community name and reward pool size */}
              </div>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="w-56 tracking-[1.02px]">
          The 10 top players on the scoreboard will receive rewards from the reward pool.{" "}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RewardPool;
