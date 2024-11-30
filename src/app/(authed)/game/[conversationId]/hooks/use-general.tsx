import { useEffect, useState } from "react";

import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { IMove, IQuestion } from "@/types/room";

import useGeneralSocket from "./use-general-socket";

const useGeneral = (conversationId: string) => {
  const { data: roomData } = useGetRoomData(conversationId);

  const [moveHistory, setMoveHistory] = useState<IMove[][]>([]);
  const [questionHistory, setQuestionHistory] = useState<Partial<IQuestion>[]>([]);
  const [asciiMovieHistory, setAsciiMovieHistory] = useState<Partial<string>[]>([]);

  const { canAsk, setCanAsk, questionAsked, setQuestionAsked, asking, setAsking, asciiScenes } =
    useGeneralSocket(conversationId);

  useEffect(() => {
    if (roomData) {
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
      const asciiMovieParts: string[] = roomData.asciiMovie || [];
      setAsciiMovieHistory(asciiScenes ? [...asciiMovieParts, ...asciiScenes] : asciiMovieParts);
    }
  }, [questionAsked, asciiScenes, roomData, setCanAsk, setQuestionAsked]);

  return { roomData, moveHistory, questionHistory, canAsk, asking, setAsking, asciiMovieHistory };
};

export default useGeneral;
