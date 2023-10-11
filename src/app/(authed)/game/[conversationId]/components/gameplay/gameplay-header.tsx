import { CloseCircle } from "iconsax-react";
import { AiOutlineExclamationCircle, AiOutlineQuestionCircle } from "react-icons/ai";

import Spinner from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import { gameStore } from "../../stores/game-store";

const GamePlayHeader = ({ title, loading }: { title: string; loading?: boolean }) => {
  const onClickHome = () => gameStore.pageState.set("GOHOME");
  const onClickHowTo = () => gameStore.pageState.set("HOWTOPLAY");
  const onClickFeedback = () => gameStore.pageState.set("FEEDBACK");

  return (
    <div className="flex w-full items-center justify-between gap-8 rounded-t-md bg-dark-900 px-12 py-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
        <p
          className="mt-1 truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
          style={jibril.style}
        >
          {title}
        </p>
        <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <Spinner
          className={cn("m-0 h-[22px] w-[22px] shrink-0 opacity-0", loading && "opacity-50")}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={onClickHowTo}
              className="text-2xl text-white/50 hover:text-white"
            >
              <AiOutlineQuestionCircle />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="mt-2">
              <p>How to play</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={onClickFeedback}
              className="text-2xl text-white/50 hover:text-white"
            >
              <AiOutlineExclamationCircle />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="mt-2">
              <p>Feedback</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div
          className="flex cursor-pointer gap-2 rounded-md bg-white/5 px-4 py-3 uppercase text-white/50 transition-all duration-200 hover:opacity-80"
          onClick={onClickHome}
        >
          <CloseCircle />
          <span className="">leave the game</span>
        </div>
      </div>
    </div>
  );
};

export default GamePlayHeader;
