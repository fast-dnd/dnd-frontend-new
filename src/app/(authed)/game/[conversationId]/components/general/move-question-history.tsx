import useAutoScrollToBottom from "@/hooks/use-auto-scroll-to-bottom";
import { IMove, IQuestion } from "@/types/room";

import MoveList from "./move-list";
import Question from "./question";

const MoveQuestionHistory = ({
  moveHistory,
  questionHistory,
}: {
  moveHistory: IMove[][];
  questionHistory: Partial<IQuestion>[];
}) => {
  const { autoBottomScrollDiv } = useAutoScrollToBottom([moveHistory, questionHistory]);

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
      <div ref={autoBottomScrollDiv} />
    </div>
  );
};

export default MoveQuestionHistory;
