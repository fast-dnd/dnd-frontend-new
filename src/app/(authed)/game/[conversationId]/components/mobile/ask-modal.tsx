import { Game } from "iconsax-react";
import { AiOutlineClose } from "react-icons/ai";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import useGeneral from "../../hooks/use-general";
import AskQuestion from "../general/ask-question";
import MoveQuestionHistory from "../general/move-question-history";

const AskModal = ({
  conversationId,
  open,
  onClose,
}: {
  conversationId: string;
  open: boolean;
  onClose: () => void;
}) => {
  const { roomData, moveHistory, questionHistory, canAsk, asking, setAsking } =
    useGeneral(conversationId);

  if (!roomData) return <div></div>;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent
        fromBottom
        className="pointer-events-auto left-0 top-0 flex h-full w-full translate-x-0 translate-y-0 bg-transparent p-0 pt-32"
      >
        <div className="relative flex h-full w-full flex-col items-center gap-6 bg-black px-4 pb-4 pt-1">
          <div className="pointer-events-none absolute top-0 z-10 flex h-16 w-full items-start justify-between rounded-t-lg border-t border-white/20 bg-gradient-to-t from-transparent to-black to-60% px-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-medium uppercase">
              <Game className="h-5 w-5" /> <p className="mt-0.5">ask bob</p>
            </div>
            <AiOutlineClose className="pointer-events-auto h-4 w-4" onClick={onClose} />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskModal;
