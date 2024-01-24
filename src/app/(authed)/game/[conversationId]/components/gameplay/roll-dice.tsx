"use client";

import { useState } from "react";
import { FaDice } from "react-icons/fa";
import Lottie from "react-lottie";

import { Button } from "@/components/ui/button";
import { IPlayer, IRoomDetail } from "@/types/room";
import animationData from "@/utils/lotties/dice-explosion.json";
import { cn } from "@/utils/style-utils";

import usePlayMove from "../../hooks/use-play-move";
import { moveStore } from "../../stores/move-store";
import DiceBreakdown from "./dice-breakdown";
import Die from "./die";

interface IRollDiceProps {
  conversationId: string;
  roomData: IRoomDetail;
  currentPlayer: IPlayer;
}

const RollDice = ({ conversationId, roomData, currentPlayer }: IRollDiceProps) => {
  const { onPlay, submitting } = usePlayMove(conversationId, roomData, currentPlayer);

  const [animate, setAnimate] = useState(false);

  const store = moveStore.use();

  return (
    <div className="flex flex-col justify-between bg-white/5 lg:w-[270px]">
      <div className="relative flex h-28 items-center justify-center gap-4">
        {((store.roll?.diceAfterBonus || 0) >= 2 || submitting) && (
          <>
            {store.buttonState === "ROLLING" &&
              store.randomDice.map((roll, i) => <Die key={i} roll={roll} animate />)}

            {store.buttonState === "ROLLED" &&
              store.dice.map((roll, i) => <Die key={i} roll={roll} />)}

            {!!store.roll && store.buttonState === "DEFAULT" && <DiceBreakdown />}
          </>
        )}
      </div>

      <Button
        disabled={
          !store.canPlay || (!store.move && !store.freeWill && !store.wordsChallenge.length)
        }
        className={cn(
          "h-12 px-0 normal-case",
          store.buttonState !== "DEFAULT" && "bg-white/5 text-white",
        )}
        onClick={onPlay}
        onMouseDown={() => {
          if (!animate) {
            setAnimate(true);
            setTimeout(() => {
              setAnimate(false);
            }, 1000);
          }
        }}
      >
        {store.buttonState === "DEFAULT" && (
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <FaDice
                className={cn(
                  "opacity-100 transition-opacity duration-200",
                  animate && "opacity-0",
                )}
              />
              <div className="pointer-events-none absolute -left-14 -top-14">
                <Lottie
                  options={{
                    loop: false,
                    autoplay: false,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  isStopped={!animate}
                  height={132}
                  width={132}
                />
              </div>
            </div>
            <span className="mt-1">Roll the dice</span>
          </div>
        )}
        {store.buttonState === "ROLLING" && <p className="text-center text-white">Rolling...</p>}
        {store.buttonState === "ROLLED" && (
          <div className="flex w-full justify-between px-4 text-white">
            <p>Total</p>
            <p>{store.roll?.diceAfterBonus}</p>
          </div>
        )}
      </Button>
    </div>
  );
};

export default RollDice;
