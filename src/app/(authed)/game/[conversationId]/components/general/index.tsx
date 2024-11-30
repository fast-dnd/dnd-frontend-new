import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

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
        <div className={cn("flex min-h-0 flex-1 flex-col gap-4 lg:gap-8", statsOpened && "hidden")}>
          {roomData.playerState.length > 1 && (
            <Button
              variant={"ghost"}
              className="border-white text-white"
              onClick={() => setStatsOpened(true)}
            >
              Team stats
            </Button>
          )}
          <MoveQuestionHistory
            moveHistory={moveHistory}
            questionHistory={questionHistory}
            thinking={asking}
            asciiMovieHistory={asciiMovieHistory}
          />

          <AskQuestion
            conversationId={conversationId}
            canAsk={canAsk}
            asking={asking}
            setAsking={setAsking}
          />
        </div>
        <div className={cn("flex min-h-0 flex-col gap-8", !statsOpened && "hidden")}>
          <div className="flex w-full">
            <Button
              variant={"ghost"}
              className="flex w-fit items-center gap-2 text-base uppercase text-white"
              onClick={() => setStatsOpened(false)}
            >
              <AiOutlineLeft /> <span className="mt-[1px]">back to events</span>
            </Button>
          </div>
          <div className="flex min-h-[100px] flex-1 flex-col gap-8 overflow-y-auto">
            {roomData.playerState
              .filter((player) => player.accountId !== currentPlayer.accountId)
              .map((player) => (
                <Player key={player.accountId} player={player} />
              ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default General;
