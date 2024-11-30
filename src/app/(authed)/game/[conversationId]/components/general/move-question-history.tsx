import Markdown from "react-markdown";

import Spinner from "@/components/ui/spinner";
import useAutoScrollToBottom from "@/hooks/helpers/use-auto-scroll-to-bottom";
import { IMove, IQuestion } from "@/types/room";
import { cn } from "@/utils/style-utils";

import MoveList from "./move-list";
import Question from "./question";

interface IMoveQuestionHistoryProps {
  moveHistory: IMove[][];
  questionHistory: Partial<IQuestion>[];
  thinking: boolean;
  asciiMovieHistory: Array<string>;
}

const MoveQuestionHistory = ({
  moveHistory,
  questionHistory,
  thinking,
  asciiMovieHistory,
}: IMoveQuestionHistoryProps) => {
  const { autoBottomScrollDiv } = useAutoScrollToBottom([moveHistory, questionHistory, thinking]);

  const movesEmpty =
    moveHistory.length === 0 || (moveHistory.length === 1 && moveHistory[0].length === 0);

  return (
    <div className="flex h-full min-h-[100px] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-2 max-lg:pt-12 lg:pr-6">
      <div
        className={cn(
          "hidden rounded-md bg-white/10 px-4 py-2 lg:text-lg",
          movesEmpty && questionHistory.length === 0 && "block",
        )}
      >
        Bob is your dungeon master. You can ask him anything you want so don&apos;t be shy! He knows
        all the answers, and is there to make your gaming experience more fun!
      </div>
      {Array.from({ length: Math.max(questionHistory.length, moveHistory.length) }, (_, i) => (
        <div key={i} className="flex flex-col gap-4">
          {!!questionHistory[i] && !!questionHistory[i].question && (
            <Question question={questionHistory[i]} />
          )}
          {Array.isArray(moveHistory[i]) && <MoveList moves={moveHistory[i]} />}
        </div>
      ))}
      {Array.from({ length: asciiMovieHistory.length }, (_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="overflow-x-auto">
            <Markdown className="markdown whitespace-pre">{asciiMovieHistory[i]}</Markdown>
          </div>
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
