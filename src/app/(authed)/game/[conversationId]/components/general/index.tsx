import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import Markdown from "react-markdown";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import useGeneral from "../../hooks/use-general";
import useGetCurrentPlayer from "../../hooks/use-get-current-player";
import AskQuestion from "./ask-question";
import GeneralSkeleton from "./general-skeleton";
import MoveQuestionHistory from "./move-question-history";
import Player from "./player";

const General = ({ conversationId }: { conversationId: string }) => {
  const { currentPlayer } = useGetCurrentPlayer(conversationId);
  const { roomData, moveHistory, questionHistory, canAsk, asking, setAsking, asciiMovieHistory } =
    useGeneral(conversationId);

  const [statsOpened, setStatsOpened] = useState(false);

  const [movieOpened, setMovieOpened] = useState(false);

  if (!roomData || !currentPlayer) return <GeneralSkeleton />;

  return (
    <Box
      title="general"
      className="flex min-h-0 flex-1 flex-col py-5 lg:py-8"
      wrapperClassName="h-full min-h-0"
    >
      <div className="flex size-full min-h-0 flex-col gap-4 overflow-y-auto px-5 lg:gap-8 lg:px-8">
        <Player player={currentPlayer} currentPlayer />
        <div className="w-full border-t border-white/25" />
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-4 lg:gap-8",
            (statsOpened || movieOpened) && "hidden",
          )}
        >
          {roomData.playerState.length > 1 && (
            <div className="flex w-full px-6">
              <Button
                className="flex w-full items-center gap-1 rounded-none border-none py-1.5 text-xs"
                onClick={() => {
                  setStatsOpened(true);
                  setMovieOpened(false);
                }}
              >
                Team stats
              </Button>
            </div>
          )}
          <div className="flex w-full px-6">
            <Button
              className="flex w-full items-center gap-1 rounded-none border-none py-1.5 text-xs"
              onClick={() => {
                setMovieOpened(true);
                setStatsOpened(false);
              }}
            >
              CLICK TO WATCH MOVIE
            </Button>
          </div>

          <MoveQuestionHistory
            moveHistory={moveHistory}
            questionHistory={questionHistory}
            thinking={asking}
          />

          <AskQuestion
            conversationId={conversationId}
            canAsk={canAsk}
            asking={asking}
            setAsking={setAsking}
          />
        </div>
        <div
          className={cn("flex min-h-0 flex-col gap-8", !statsOpened && !movieOpened && "hidden")}
        >
          {/* Back to events button */}
          <div className="flex w-full">
            <Button
              variant={"ghost"}
              className="flex w-fit items-center gap-2 text-base uppercase text-white"
              onClick={() => {
                setStatsOpened(false);
                setMovieOpened(false);
              }}
            >
              <AiOutlineLeft /> <span className="mt-[1px]">back to events</span>
            </Button>
          </div>

          {/* Render stats if statsOpened */}
          {statsOpened && (
            <div className="flex min-h-[100px] flex-1 flex-col gap-8 overflow-y-auto">
              {roomData.playerState
                .filter((player) => player.accountId !== currentPlayer.accountId)
                .map((player) => (
                  <Player key={player.accountId} player={player} />
                ))}
            </div>
          )}

          {/* Render movie if movieOpened */}
          {movieOpened && (
            <div className="flex flex-col gap-8 overflow-y-auto">
              {Array.from({ length: asciiMovieHistory.length }, (_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="overflow-x-auto rounded-md bg-white/10 px-4 py-2 lg:text-lg">
                    <Markdown className="markdown whitespace-pre">{asciiMovieHistory[i]}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default General;
