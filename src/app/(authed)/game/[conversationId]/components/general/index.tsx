"use client";

import { FormEventHandler, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/utils/style-utils";

import useAskQuestion from "../../hooks/use-ask-question";
import useGeneral from "../../hooks/use-general";
import { gameStore } from "../../stores/game-store";
import MoveQuestionHistory from "./move-question-history";
import Player from "./player";

const General = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { roomData, currentPlayer, moveHistory, questionHistory, canAsk, asking, setAsking } =
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

  if (!roomData || !currentPlayer) {
    return (
      <Box title="GENERAL" className="flex h-full items-center justify-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  return (
    <Box title="general" className="flex min-h-0 flex-1 flex-col gap-4 p-5 lg:gap-8 lg:p-8">
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
        <MoveQuestionHistory moveHistory={moveHistory} questionHistory={questionHistory} />

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
            className="w-fit text-3xl text-primary"
            isLoading={asking}
          >
            {!asking && <IoMdSend />}
          </Button>
        </form>
      </div>
      <div className={cn("flex flex-col gap-8", !statsOpened && "hidden")}>
        <div className="flex w-full">
          <Button
            variant={"ghost"}
            className="flex w-fit items-center gap-2 text-base uppercase text-white"
            onClick={() => setStatsOpened(false)}
          >
            <AiOutlineLeft /> <span className="mt-[1px]">back to events</span>
          </Button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-auto">
          {roomData.playerState
            .filter((player) => player.accountId !== currentPlayer.accountId)
            .map((player) => (
              <Player key={player.accountId} player={player} />
            ))}
        </div>
      </div>
    </Box>
  );
};

export default General;
