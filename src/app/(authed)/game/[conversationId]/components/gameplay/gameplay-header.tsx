import { AiOutlineExclamationCircle, AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";

import Spinner from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { jibril } from "@/utils/fonts";

import { gameStore } from "../../stores/game-store";

const GamePlayHeader = ({ title, loading }: { title: string; loading?: boolean }) => {
  const onClickHome = () => gameStore.pageState.set("GOHOME");
  const onClickHowTo = () => gameStore.pageState.set("HOWTOPLAY");
  const onClickFeedback = () => gameStore.pageState.set("FEEDBACK");

  return (
    <div className="relative flex w-full items-center justify-center gap-4 rounded-t-md bg-dark-900 px-12 py-6">
      <div className="h-2 w-2 rotate-45 bg-primary" />
      <p
        className="mt-1 max-w-[75%] truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
        style={jibril.style}
      >
        {title}
      </p>
      <div className="h-2 w-2 rotate-45 bg-primary" />
      <div className="absolute left-12 hidden h-full items-center gap-4 lg:flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={onClickHome}
              className="text-xl text-white/50 hover:text-white"
            >
              <AiOutlineHome />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="mt-2">
              <p>Go home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="absolute right-12 hidden h-full items-center gap-4 lg:flex">
        {loading && <Spinner className="m-0 opacity-50" />}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={onClickHowTo}
              className="text-xl text-white/50 hover:text-white"
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
              className="text-xl text-white/50 hover:text-white"
            >
              <AiOutlineExclamationCircle />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="mt-2">
              <p>Feedback</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default GamePlayHeader;
