"use client";

import { FormEventHandler, useEffect, useRef, useState } from "react";
import zip from "lodash/zip";
import { AiOutlineLeft } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";

import { IMove, IPlayer, IQuestion } from "@/types/game";
import { cn } from "@/utils/style-utils";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";

import useAskQuestion from "../hooks/use-ask-question";
import useGeneralSocket from "../hooks/use-general-socket";
import { useGameStore } from "../stores/game-store";
import Moves from "./moves";
import Player from "./player";
import Question from "./question";

const General = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { data: roomData } = useGetRoomData(conversationId);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [statsOpened, setStatsOpened] = useState(false);
  const [question, setQuestion] = useState("");
  const { canAsk, setCanAsk, questionAsked, setQuestionAsked, asking, setAsking } =
    useGeneralSocket(conversationId);
  const { changes } = useGameStore((state) => state);
  const { mutate: askQuestion } = useAskQuestion();
  const [moveHistory, setMoveHistory] = useState<IMove[][]>([]);
  const [questionHistory, setQuestionHistory] = useState<Partial<IQuestion>[]>([]);
  useEffect(() => {
    if (roomData) {
      setCurrentPlayer(
        roomData.playerState.find(
          (player) => player.accountId === localStorage.getItem("accountId"),
        ),
      );
      const questionsLength = roomData.questions3History.length;
      if (roomData.state !== "GAMING") {
        setCanAsk(false);
      }
      if (questionsLength === roomData.currentRound + 1) {
        if (roomData.questions3History[questionsLength - 1].question) {
          setQuestionAsked(undefined);
          setCanAsk(false);
        }
      } else if (questionAsked && questionAsked.playerAccountId) {
        setCanAsk(false);
      }
      const questions = roomData.questions3History || [];
      setQuestionHistory(questionAsked ? [...questions, questionAsked] : questions);
      const moves = roomData.moves || [];
      setMoveHistory(roomData.queuedMoves ? [...moves, roomData.queuedMoves] : moves);
    }
  }, [questionAsked, roomData, setCanAsk, setQuestionAsked]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    setAsking(true);
    setQuestion("");
    askQuestion({ conversationId, question }, { onError: () => setAsking(false) });
  };

  const autoBottomScrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoBottomScrollDiv.current) {
      autoBottomScrollDiv.current.scrollIntoView({ behavior: "instant" });
    }
  }, [moveHistory, questionHistory]);

  if (!roomData || !currentPlayer) {
    return (
      <Box title="GENERAL" className="flex h-full items-center justify-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  return (
    <Box title="general" className="flex min-h-0 flex-1 flex-col gap-8 p-8">
      <Player player={currentPlayer} currentPlayer changes={changes} />
      <div className="w-full border-t border-white/25" />
      <div className={cn("flex min-h-0 flex-1 flex-col gap-8", statsOpened && "hidden")}>
        {roomData.playerState.length > 1 && (
          <Button
            variant={"ghost"}
            className="border-white text-white"
            onClick={() => setStatsOpened(true)}
          >
            Team stats
          </Button>
        )}
        {/* TODO: update when BE updates requests and socket events */}
        <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto pr-6">
          {zip(questionHistory, moveHistory).map((val, i) => (
            <div key={i} className="flex flex-col gap-4">
              {!!val[0] && !!val[0].question && <Question question={val[0]} />}
              {Array.isArray(val[1]) && <Moves moves={val[1]} />}
            </div>
          ))}
          <div ref={autoBottomScrollDiv} />
        </div>

        <form onSubmit={onSubmit} className="flex w-full items-end gap-8">
          <div className="flex flex-1 flex-col">
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
            className="w-fit text-2xl text-tomato"
          >
            {!asking && <IoMdSend />}
            {asking && <Spinner className="m-0 h-6 w-6 opacity-50" />}
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
