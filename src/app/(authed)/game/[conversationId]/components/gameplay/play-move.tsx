"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { IPlayMove } from "@/types/game";
import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import usePlayMove from "../../hooks/use-play-move";
import usePlayMoveSocket from "../../hooks/use-play-move-socket";
import { moveStore } from "../../stores/move-store";
import { generateDice, generateRandomDice } from "../../utils/dice";
import DiceBreakdown from "./dice-breakdown";
import Die from "./die";
import MoveInput from "./move-input";
import PickPowerup from "./pick-powerup";

export interface PlayMoveProps {
  roomData: IRoomDetail;
  conversationId: string;
  currentPlayer: IPlayer;
  loadingText: boolean;
}

const PlayMove = ({ roomData, conversationId, currentPlayer, loadingText }: PlayMoveProps) => {
  // TODO: separate state and effects into custom hooks (or custom components if the state is localized)
  const [timer, setTimer] = useState(0);

  usePlayMoveSocket(conversationId);

  const store = moveStore.use();

  const { mutate: playMove, isLoading: submitting } = usePlayMove();

  useEffect(() => {
    if ((currentPlayer.mana || 0) < store.powerup) {
      moveStore.powerup.set(0);
    }
    if ((currentPlayer.health || 0) <= 0) moveStore.canPlay.set(false);
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
        moveStore.canPlay.set(false);
      }
    } else if (!loadingText && store.buttonState !== "ROLLING") {
      moveStore.canPlay.set(true);
      moveStore.buttonState.set("CANPLAY");
    }
    if (roomData.state === "WIN" || roomData.state === "LOSE") moveStore.canPlay.set(false);
  }, [currentPlayer, loadingText, roomData, store.buttonState, store.powerup]);

  useEffect(() => {
    if (submitting) {
      const timeout = setTimeout(() => moveStore.dice.set(generateRandomDice()), 200);

      return () => clearTimeout(timeout);
    }
  }, [submitting]);

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
    const moveToPlay: IPlayMove = {
      conversationId,
      mana: store.powerup,
      moveType: store.move ?? "free_will",
      message: store.move ? "" : store.freeWill,
      playerId: currentPlayer.accountId,
    };

    if (moveToPlay) {
      moveStore.buttonState.set("ROLLING");
      moveStore.canPlay.set(false);
      playMove(moveToPlay, {
        onSuccess: (res) => {
          moveStore.freeWill.set("");
          moveStore.roll.set(res);
          const rollTimeout = setTimeout(() => moveStore.buttonState.set("ROLLED"), 1500);
          const diceTimeout = setTimeout(
            () => moveStore.dice.set(generateDice(res.diceAfterBonus)),
            250,
          );

          return () => {
            clearTimeout(rollTimeout);
            clearTimeout(diceTimeout);
          };
        },
        onError: () => {
          moveStore.buttonState.set("CANPLAY");
          moveStore.canPlay.set(true);
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
            store.buttonState !== "CANPLAY" && "hidden lg:flex",
          )}
        >
          <div
            className={cn(
              "bg-white/5 px-4 py-2.5 text-xl uppercase tracking-[0.07em] lg:px-8",
              !store.canPlay && "text-white/50",
            )}
          >
            <span className="font-semibold">
              Type or select <span className="hidden lg:inline"> your move</span>
            </span>
            <span className="opacity-50"> - {timeToDisplay()} Left</span>
          </div>
          <MoveInput champion={currentPlayer.champion} />
        </div>
        <div className="flex flex-col gap-6">
          <PickPowerup currentMana={currentPlayer.mana} />
          <div className="flex flex-col justify-between bg-white/5 lg:w-[270px]">
            <div className="relative flex h-28 items-center justify-center gap-4">
              {((store.roll?.diceAfterBonus || 0) >= 2 || submitting) && (
                <>
                  {store.buttonState === "ROLLING" &&
                    store.dice.map((roll, i) => <Die key={i} roll={roll} />)}

                  {!!store.roll && store.buttonState !== "ROLLING" && (
                    <DiceBreakdown rollInfo={store.roll} />
                  )}
                </>
              )}
            </div>
            <Button
              disabled={!store.canPlay || (!store.move && !store.freeWill)}
              className={cn(
                "h-12 px-0 normal-case",
                store.buttonState !== "CANPLAY" && "bg-white/5 text-white",
              )}
              onClick={onPlay}
            >
              {store.buttonState === "CANPLAY" && <p className="text-center">Roll the dice</p>}
              {store.buttonState === "ROLLING" && <p className="text-center">Rolling...</p>}
              {store.buttonState === "ROLLED" && (
                <div className="flex w-full justify-between px-4">
                  <p>Total</p>
                  <p>{store.roll?.diceAfterBonus}</p>
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
