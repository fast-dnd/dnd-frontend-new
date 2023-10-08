"use client";

import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IPlayMove, IPlayMoveResponse } from "@/types/game";
import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import usePlayMove from "../../hooks/use-play-move";
import usePlayMoveSocket from "../../hooks/use-play-move-socket";
import { randomDice } from "../../utils/dice";
import DiceBreakdown from "../dice-breakdown";
import Die from "../die";
import MoveInput from "./move-input";

export interface PlayMoveProps {
  roomData: IRoomDetail;
  conversationId: string;
  currentPlayer: IPlayer;
  loadingText: boolean;
}

const PlayMove = ({ roomData, conversationId, currentPlayer, loadingText }: PlayMoveProps) => {
  const [rollInfo, setRollInfo] = useState<IPlayMoveResponse>();
  const [freeWill, setFreeWill] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [dice, setDice] = useState([0, 0]);
  const [powerUp, setPowerUp] = useState(0);

  const { canPlay, move, rollButtonState, setCanPlay, setMove, setRollButtonState } =
    usePlayMoveSocket(conversationId);

  const { mutate: playMove, isLoading: submitting } = usePlayMove();

  useEffect(() => {
    if ((currentPlayer.mana || 0) < powerUp) {
      setPowerUp(0);
    }
    if ((currentPlayer.health || 0) <= 0) setCanPlay(false);
    if (loadingText) {
      setTimer(0);
    } else if (roomData.roundEndsAt) {
      const endsAt = new Date(roomData.roundEndsAt);
      setTimer(Math.max(Math.floor((endsAt.getTime() - new Date().getTime()) / 1000), 0));
    }
    if (roomData.queuedMoves && roomData.queuedMoves.length > 0) {
      const currentPlayerMove = roomData.queuedMoves.find(
        (move) => move.playerAccountId === currentPlayer.accountId,
      );
      if (currentPlayerMove) {
        setCanPlay(false);
      }
    } else if (!loadingText && rollButtonState !== "ROLLING") {
      setCanPlay(true);
      setRollButtonState("CANPLAY");
    }
    if (roomData.state === "WIN" || roomData.state === "LOSE") setCanPlay(false);
    //TODO setRollInfo of most recent move, when move format contains all required fields
  }, [
    currentPlayer,
    loadingText,
    powerUp,
    rollButtonState,
    roomData,
    setCanPlay,
    setRollButtonState,
  ]);

  useEffect(() => {
    submitting && setTimeout(() => setDice(randomDice()), 200);
  }, [dice, submitting]);

  useEffect(() => {
    const interval = setInterval(() => {
      timer > 0 && !loadingText && setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [loadingText, timer]);

  const timeToDisplay = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${("0" + seconds).slice(-2)}`;
  };

  const onPlay = () => {
    let moveToPlay: IPlayMove | undefined;
    if (move) {
      moveToPlay = {
        conversationId,
        mana: powerUp,
        moveType: move,
        playerId: currentPlayer.accountId,
        message: "",
      };
    } else {
      moveToPlay = {
        conversationId,
        mana: powerUp,
        moveType: "free_will",
        message: freeWill,
        playerId: currentPlayer.accountId,
      };
    }
    if (moveToPlay) {
      setRollButtonState("ROLLING");
      setCanPlay(false);
      playMove(moveToPlay, {
        onSuccess: (res) => {
          setFreeWill("");
          setRollInfo(res);
          setTimeout(() => setRollButtonState("ROLLED"), 1500);
          setTimeout(() => setDice(randomDice(res.diceAfterBonus)), 250);
        },
        onError: () => {
          setRollButtonState("CANPLAY");
          setCanPlay(true);
        },
      });
    }
  };
  return (
    <>
      <div
        className={cn(
          "flex w-full flex-col gap-8 lg:flex-row",
          (roomData.state === "WIN" || roomData.state === "LOSE" || currentPlayer.health <= 0) &&
            "hidden",
        )}
      >
        <div
          className={cn(
            "flex h-full flex-1 flex-col gap-6",
            rollButtonState !== "CANPLAY" && "hidden lg:flex",
          )}
        >
          <div
            className={cn(
              "bg-white/5 px-4 py-2.5 text-xl uppercase tracking-[0.07em] lg:px-8",
              !canPlay && "text-white/50",
            )}
          >
            <span className="font-semibold">
              Type or select <span className="hidden lg:inline"> your move</span>
            </span>
            <span className="opacity-50"> - {timeToDisplay()} Left</span>
          </div>
          <MoveInput
            move={move}
            freeWill={freeWill}
            champion={currentPlayer.champion}
            canPlay={canPlay}
            setMove={setMove}
            setFreeWill={setFreeWill}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div
            className={cn(
              "flex h-12 w-full items-center justify-between bg-white/5",
              rollButtonState !== "CANPLAY" && "hidden opacity-50 lg:flex",
            )}
          >
            <Button
              variant="ghost"
              disabled={powerUp === 0 || !canPlay}
              onClick={() => setPowerUp(powerUp - 1)}
              className="flex h-full w-12 items-center justify-center bg-white/10 px-0 text-white"
            >
              <FiMinus />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center gap-2.5 text-xl font-semibold">
                  <span className="mt-0.5">{powerUp}</span> <HiSparkles />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col items-center p-4 text-center">
                    <p className="text-lg font-semibold">Select mana boost</p>
                    <p>This will power up your luck</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="ghost"
              disabled={powerUp === 2 || powerUp >= currentPlayer.mana || !canPlay}
              onClick={() => setPowerUp(powerUp + 1)}
              className="flex h-full w-12 items-center justify-center bg-white/10 px-0 text-white"
            >
              <FiPlus />
            </Button>
          </div>
          <div className="flex flex-col justify-between bg-white/5 lg:w-[270px]">
            <div className="relative flex h-28 items-center justify-center gap-4">
              {((rollInfo?.diceAfterBonus || 0) >= 2 || submitting) && (
                <>
                  {rollButtonState === "ROLLING" &&
                    dice.map((roll, i) => <Die key={i} roll={roll} />)}

                  {!!rollInfo && rollButtonState !== "ROLLING" && (
                    <DiceBreakdown rollInfo={rollInfo} />
                  )}
                </>
              )}
            </div>
            <Button
              disabled={!canPlay || (!move && !freeWill)}
              className={cn(
                "h-12 px-0 normal-case",
                rollButtonState !== "CANPLAY" && "bg-white/5 text-white",
              )}
              onClick={onPlay}
            >
              {rollButtonState === "CANPLAY" && <p className="text-center">Roll the dice</p>}
              {rollButtonState === "ROLLING" && <p className="text-center">Rolling...</p>}
              {rollButtonState === "ROLLED" && (
                <div className="flex w-full justify-between px-4">
                  <p>Total</p>
                  <p>{rollInfo?.diceAfterBonus}</p>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {currentPlayer.health <= 0 && roomData.state === "GAMING" && (
        <div className="flex h-44 w-full flex-col items-center justify-center bg-white/5 lg:text-xl">
          <p className="text-center font-semibold">Players are choosing their actions...</p>
          <p>{timeToDisplay()} Left</p>
        </div>
      )}
    </>
  );
};

export default PlayMove;
