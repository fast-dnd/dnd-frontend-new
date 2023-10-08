"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { IPlayMove } from "@/types/game";
import { cn } from "@/utils/style-utils";

import useSubmitMove from "../../hooks/use-submit-move";
import { moveStore } from "../../stores/move-store";
import { generateDice, generateRandomDice } from "../../utils/dice";
import DiceBreakdown from "./dice-breakdown";
import Die from "./die";

const RollDice = ({ conversationId, accountId }: { conversationId: string; accountId: string }) => {
  const { mutate: submitMove, isLoading: submitting } = useSubmitMove();

  const store = moveStore.use();

  useEffect(() => {
    if (submitting) {
      const timeout = setTimeout(() => moveStore.dice.set(generateRandomDice()), 200);

      return () => clearTimeout(timeout);
    }
  }, [submitting]);

  const onPlay = () => {
    const moveToPlay: IPlayMove = {
      conversationId,
      mana: store.powerup,
      moveType: store.move ?? "free_will",
      message: store.move ? "" : store.freeWill,
      playerId: accountId,
    };

    if (moveToPlay) {
      moveStore.buttonState.set("ROLLING");
      moveStore.canPlay.set(false);
      submitMove(moveToPlay, {
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
  );
};

export default RollDice;
