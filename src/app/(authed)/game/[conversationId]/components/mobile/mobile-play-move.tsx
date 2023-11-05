"use client";

import { AiFillHeart, AiOutlineLeft } from "react-icons/ai";
import { FaDice } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";
import { PiPenNibFill } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { IDefaultMove } from "@/types/room";
import { cn } from "@/utils/style-utils";
import { defaultMoves } from "@/validations/room";

import usePlayMove from "../../hooks/use-play-move";
import usePlayMoveSocket from "../../hooks/use-play-move-socket";
import { moveStore } from "../../stores/move-store";
import PickPowerup from "../gameplay/pick-powerup";
import { PlayMoveProps } from "../gameplay/play-move";

const MobilePlayMove = ({ roomData, conversationId, currentPlayer }: PlayMoveProps) => {
  const { openedDetails, setOpenedDetails } = usePlayMoveSocket(conversationId);
  const { onPlay } = usePlayMove(conversationId, roomData, currentPlayer);

  const store = moveStore.use();

  if (!currentPlayer.champion) return <div>Something went wrong.</div>;
  return (
    <div
      className={cn(
        "flex border-t border-white/20 bg-black opacity-100 transition-all",
        !store.canPlay && "hidden opacity-0",
      )}
    >
      <div
        className={cn("relative flex w-full flex-col gap-3 py-3.5 pl-4", openedDetails && "hidden")}
      >
        <p className="text-xs font-medium uppercase tracking-wide">Take action</p>
        <div className="absolute right-0 h-full w-12 bg-gradient-to-l from-black to-transparent" />

        <div className="flex gap-2 overflow-x-auto pr-8">
          <MoveDisplay
            move="free_will"
            onClick={() => {
              setOpenedDetails(true);
              moveStore.move.set(undefined);
            }}
          />
          {defaultMoves.map((move) => (
            <MoveDisplay
              key={move}
              move={move}
              onClick={() => {
                moveStore.move.set(move);
                setOpenedDetails(true);
              }}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          "flex min-h-[100px] w-full flex-col justify-between gap-2",
          !openedDetails && "hidden",
        )}
      >
        <div className="flex w-full flex-col gap-3 px-4 pt-3">
          <div className="flex w-full items-center gap-3">
            <AiOutlineLeft onClick={() => setOpenedDetails(false)} />
            <MoveDisplay
              action
              move={store.move || "free_will"}
              className="border-0 p-0 uppercase"
            />
          </div>
          {store.move ? (
            <p
              className={cn(
                "text-xs",
                store.move === "discover_health" && "text-primary",
                store.move === "discover_mana" && "text-cyan-500",
                store.move === "conversation_with_team" && "text-green-500",
                store.move === "rest" && "text-purple-400",
              )}
            >
              {currentPlayer.champion.moveMapping[store.move]}
            </p>
          ) : (
            <TextArea
              placeholder="Write your response and roll the dice..."
              className="m-0 w-full border-0 p-0 text-xs"
              value={store.freeWill}
              onChange={(e) => {
                moveStore.freeWill.set(e.target.value);
              }}
            />
          )}
        </div>
        <div className="flex border border-gray-800">
          <PickPowerup currentMana={currentPlayer.mana} />
          <div className="flex w-full bg-primary px-6">
            <Button
              onClick={onPlay}
              disabled={!store.canPlay || (!store.move && !store.freeWill)}
              className="flex w-full items-center gap-1 rounded-none border-none py-1.5 text-xs"
            >
              <FaDice /> Roll the dice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MoveDisplay = ({
  move,
  onClick,
  className,
  action,
}: {
  move: IDefaultMove | "free_will";
  onClick?: () => void;
  className?: string;
  action?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-md border border-white p-2 text-xs font-medium",
        move === "discover_health" && "border-primary text-primary",
        move === "discover_mana" && "border-cyan-500 text-cyan-500",
        move === "conversation_with_team" && "border-green-500 text-green-500",
        move === "rest" && "border-purple-400 text-purple-400",
        className,
      )}
      onClick={onClick}
    >
      {move === "free_will" && (
        <>
          <PiPenNibFill /> Free Will
        </>
      )}
      {move === "discover_health" && (
        <>
          <AiFillHeart /> Heal {action && "action"}
        </>
      )}
      {move === "discover_mana" && (
        <>
          <HiSparkles /> Mana {action && "action"}
        </>
      )}
      {move === "conversation_with_team" && (
        <>
          <GoPeople /> Round bonus {action && "action"}
        </>
      )}
      {move === "rest" && (
        <>
          <GiNightSleep /> Rest {action && "action"}
        </>
      )}
    </div>
  );
};

export default MobilePlayMove;
