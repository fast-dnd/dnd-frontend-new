import Spinner from "@/components/ui/spinner";
import useAutoScrollToBottom from "@/hooks/helpers/use-auto-scroll-to-bottom";
import { IMove, IQuestion } from "@/types/room";

import MoveList from "./move-list";
import Question from "./question";

const MoveQuestionHistory = ({
  moveHistory,
  questionHistory,
  thinking,
}: {
  moveHistory: IMove[][];
  questionHistory: Partial<IQuestion>[];
  thinking: boolean;
}) => {
  const { autoBottomScrollDiv } = useAutoScrollToBottom([moveHistory, questionHistory, thinking]);

  return (
    <div className="flex h-full min-h-[100px] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-2 lg:pr-6">
      {Array.from({ length: Math.max(questionHistory.length, moveHistory.length) }, (_, i) => (
        <div key={i} className="flex flex-col gap-4">
          {!!questionHistory[i] && !!questionHistory[i].question && (
            <Question question={questionHistory[i]} />
          )}
          {Array.isArray(moveHistory[i]) && <MoveList moves={moveHistory[i]} />}
        </div>
      ))}
      <div ref={autoBottomScrollDiv} className="flex justify-center">
        {thinking && (
          <div className="flex items-center gap-2">
            <Spinner className="m-0 fill-none text-primary" hidePath />
            <span>
              <span className="font-semibold text-primary">Bob</span> is thinking...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveQuestionHistory;
