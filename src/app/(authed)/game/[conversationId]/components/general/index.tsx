import { FormEventHandler, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/style-utils";

import useAskQuestion from "../../hooks/use-ask-question";
import useGeneral from "../../hooks/use-general";
import useGetCurrentPlayer from "../../hooks/use-get-current-player";
import { gameStore } from "../../stores/game-store";
import GeneralSkeleton from "./general-skeleton";
import MoveQuestionHistory from "./move-question-history";
import Player from "./player";

const General = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { currentPlayer } = useGetCurrentPlayer(conversationId);
  const { roomData, moveHistory, questionHistory, canAsk, asking, setAsking } =
    useGeneral(conversationId);
  const { mutate: askQuestion } = useAskQuestion();

  const [statsOpened, setStatsOpened] = useState(false);
  const [question, setQuestion] = useState("");

  const statusUpdate = gameStore.statusUpdate.use();

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    setAsking(true);
    setQuestion("");
    askQuestion({ conversationId, question }, { onError: () => setAsking(false) });
  };

  if (!roomData || !currentPlayer) return <GeneralSkeleton />;

  return (
    <Box
      title="general"
      className="flex min-h-0 flex-1 flex-col py-5 lg:py-8"
      wrapperClassName="h-full"
    >
      <div className="flex h-full min-h-0 w-full flex-col gap-4 overflow-y-auto px-5 lg:gap-8 lg:px-8">
        <Player player={currentPlayer} currentPlayer statusUpdate={statusUpdate} />
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
          />

          <form onSubmit={onSubmit} className="flex w-full items-end">
            <div className="flex flex-1">
              <Input
                disabled={!canAsk}
                label="Ask Bob"
                value={question}
                className="m-0"
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />
            </div>
            <Button
              disabled={!canAsk}
              type="submit"
              variant="ghost"
              className="h-[60px] w-20 items-center text-3xl text-primary"
              isLoading={asking}
              aria-label="Send"
            >
              {!asking && <IoMdSend />}
            </Button>
          </form>
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
