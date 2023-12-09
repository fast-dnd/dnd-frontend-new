import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { jibril } from "@/utils/fonts";

const ClaimRewardModal = () => {
  const { data: currentCommunity } = useGetCurrentCommunity();

  return (
    <Dialog>
      <div className="w-full rounded-b-md text-sm font-bold tracking-wider transition-all duration-300 lg:rounded-md lg:border-2 lg:text-xl lg:tracking-normal">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button className="w-full uppercase">claim reward</Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="w-56 font-normal">
              In case you were one of the 10 top players this week, you will receive a reward.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <DialogContent className="flex flex-col gap-12 border border-white/10 bg-black p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-sm uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              CLAIM A REWARD
            </p>
            <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
          </div>
          <p className="text-center text-sm font-light lg:w-[450px] lg:text-xl lg:tracking-[1.5px]">
            Congrats! You have reached the top of the scoreboard and earned
          </p>
        </div>

        <div className="flex h-32 w-full flex-col items-center justify-center gap-4">
          <Image
            src="/images/web3-reward-animation.gif"
            alt="reward animation"
            width={250}
            height={250}
            className="absolute top-[25%] z-[-5]"
          />
          <p className="z-10 text-5xl" style={jibril.style}>
            40
            {/* TODO: replace this with reward from web3  */}
          </p>
          <p className="z-10 text-3xl">{currentCommunity?.currencyName}</p>
        </div>

        <DialogFooter className="flex w-full items-center justify-center">
          <Button className="w-56">CLAIM REWARD</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardModal;
