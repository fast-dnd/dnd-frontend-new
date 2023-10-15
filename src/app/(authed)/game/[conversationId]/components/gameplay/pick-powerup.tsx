import { FiMinus, FiPlus } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utils/style-utils";

import { moveStore } from "../../stores/move-store";

const PickPowerup = ({ currentMana }: { currentMana: number }) => {
  const powerup = moveStore.powerup.use();
  const buttonState = moveStore.buttonState.use();
  const canPlay = moveStore.canPlay.use();

  return (
    <div
      className={cn(
        "flex h-12 w-full items-center justify-between bg-white/5",
        buttonState !== "CANPLAY" && "hidden opacity-50 lg:flex",
      )}
    >
      <Button
        variant="ghost"
        disabled={powerup === 0 || !canPlay}
        onClick={() => moveStore.powerup.set(powerup - 1)}
        className="flex h-full w-12 items-center justify-center bg-white/10 px-0 text-white"
        aria-label="Decrease mana boost"
      >
        <FiMinus />
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex cursor-default items-center gap-2.5 text-xl font-semibold">
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
        className="flex h-full w-12 items-center justify-center bg-white/10 px-0 text-white"
        aria-label="Increase mana boost"
      >
        <FiPlus />
      </Button>
    </div>
  );
};

export default PickPowerup;
