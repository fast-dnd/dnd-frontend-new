import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { IMove, IPlayer, IQuestion } from "@/types/room";

import useGeneralSocket from "./use-general-socket";

const useGeneral = (conversationId: string) => {
  const { data: roomData } = useGetRoomData(conversationId);

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();

  const [moveHistory, setMoveHistory] = useState<IMove[][]>([]);
  const [questionHistory, setQuestionHistory] = useState<Partial<IQuestion>[]>([]);

  const { canAsk, setCanAsk, questionAsked, setQuestionAsked, asking, setAsking } =
    useGeneralSocket(conversationId);

  const accountId = useReadLocalStorage<string>("accountId");

  useEffect(() => {
    if (roomData) {
      setCurrentPlayer(roomData.playerState.find((player) => player.accountId === accountId));
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
      setMoveHistory(roomData.queuedMoves.length > 0 ? [...moves, roomData.queuedMoves] : moves);
    }
  }, [accountId, questionAsked, roomData, setCanAsk, setQuestionAsked]);

  return { roomData, currentPlayer, moveHistory, questionHistory, canAsk, asking, setAsking };
};

export default useGeneral;
