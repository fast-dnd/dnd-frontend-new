import { CloseCircle } from "iconsax-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import Spinner from "@/components/ui/spinner";
import { Tooltip } from "@/components/ui/tooltip";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import { gameStore } from "../../stores/game-store";

const GamePlayHeader = ({ title }: { title: string }) => {
  const onClickHome = () => gameStore.pageState.set("GOHOME");
  const onClickFeedback = () => gameStore.pageState.set("FEEDBACK");

  const loading = gameStore.loadingText.use();

  return (
    <div className="flex w-full items-center justify-between gap-8 rounded-t-md bg-dark-800 px-12 py-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="size-2 shrink-0 rotate-45 bg-primary" />
        <p
          className="mt-1 truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
          style={jibril.style}
        >
          {title}
        </p>
        <div className="size-2 shrink-0 rotate-45 bg-primary" />
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <Spinner className={cn("m-0 size-5 shrink-0 opacity-0", loading && "opacity-50")} />

        <Tooltip
          content="Feedback"
          triggerClassName="text-2xl text-white/50 transition-all duration-200 hover:text-white"
          position="bottom"
          onClick={onClickFeedback}
        >
          <AiOutlineExclamationCircle />
        </Tooltip>

        <div
          className="flex cursor-pointer gap-2 rounded-md bg-white/5 px-4 py-3 uppercase text-white/50 opacity-80 transition-all duration-200 hover:opacity-100"
          onClick={onClickHome}
        >
          <CloseCircle />
          <span>leave the game</span>
        </div>
      </div>
    </div>
  );
};

export default GamePlayHeader;
