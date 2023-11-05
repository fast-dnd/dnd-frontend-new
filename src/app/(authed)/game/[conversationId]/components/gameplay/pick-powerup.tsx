import { FiMinus, FiPlus } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utils/style-utils";

import { moveStore } from "../../stores/move-store";

const PickPowerup = ({ currentMana }: { currentMana: number }) => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");
  const powerup = moveStore.powerup.use();
  const canPlay = moveStore.canPlay.use();

  return (
    <div
      className={cn(
        "flex h-8 items-center justify-between gap-4 bg-white/10 lg:h-12 lg:w-full lg:bg-white/5",
        !canPlay && "opacity-50",
      )}
    >
      <Button
        variant="ghost"
        disabled={powerup === 0 || !canPlay}
        onClick={() => moveStore.powerup.set(powerup - 1)}
        className="flex h-full w-7 items-center justify-center bg-white/20 px-0 text-white max-lg:rounded-none lg:w-12 lg:bg-white/10"
        aria-label="Decrease mana boost"
      >
        <FiMinus />
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            disabled={isMobileTablet}
            className="flex cursor-default items-center gap-1 text-xs font-semibold lg:gap-2.5 lg:text-xl"
          >
            <span className="mt-0.5">{powerup}</span> <HiSparkles />
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col items-center p-4 text-center">
              <p className="text-lg font-semibold">Select mana boost</p>
              <p>This will power up your luck</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        variant="ghost"
        disabled={powerup === 2 || powerup >= currentMana || !canPlay}
        onClick={() => moveStore.powerup.set(powerup + 1)}
        className="flex h-full w-7 items-center justify-center bg-white/20 px-0 text-white max-lg:rounded-none lg:w-12 lg:bg-white/10"
        aria-label="Increase mana boost"
      >
        <FiPlus />
      </Button>
    </div>
  );
};

export default PickPowerup;
