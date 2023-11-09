import { Game } from "iconsax-react";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "usehooks-ts";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import useGeneral from "../../hooks/use-general";
import { gameStore } from "../../stores/game-store";
import AskQuestion from "../general/ask-question";
import MoveQuestionHistory from "../general/move-question-history";

const AskModal = ({
  conversationId,
  open,
  onClose,
  onOpen,
}: {
  conversationId: string;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");
  const { roomData, moveHistory, questionHistory, canAsk, asking, setAsking } =
    useGeneral(conversationId);

  const pageState = gameStore.pageState.use();
  const rewardOpen = gameStore.reward.use();

  if (!roomData) return <div></div>;

  return (
    <Dialog
      open={open && isMobileTablet && pageState === "DEFAULT" && !rewardOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogTrigger
        onClick={onOpen}
        className="flex items-center gap-2 text-xs font-medium uppercase text-primary"
      >
        <Game className="h-5 w-5" /> <p className="mt-0.5">ask bob</p>
      </DialogTrigger>
      <DialogContent
        fromBottom
        className="pointer-events-auto left-0 top-[20%] flex h-[80%] w-full max-w-full translate-x-0 translate-y-0 flex-col gap-6 bg-black  px-4 pb-4 pt-1 data-[state=closed]:duration-500 data-[state=open]:duration-500"
      >
        <div className="pointer-events-none absolute inset-0 z-10 flex h-16 w-full items-start justify-between rounded-t-lg border-t border-white/20 bg-gradient-to-t from-transparent to-black to-60% px-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase">
            <Game className="h-5 w-5" /> <p className="mt-0.5">ask bob</p>
          </div>
          <button autoFocus onClick={onClose}>
            <AiOutlineClose className="pointer-events-auto h-4 w-4" />
          </button>
        </div>
        <MoveQuestionHistory
          moveHistory={moveHistory}
          questionHistory={questionHistory}
          thinking={asking}
        />
        <AskQuestion
          asking={asking}
          canAsk={canAsk}
          conversationId={conversationId}
          setAsking={setAsking}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AskModal;
