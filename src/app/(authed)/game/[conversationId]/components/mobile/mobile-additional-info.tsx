"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLeft, AiOutlinePlus } from "react-icons/ai";
import { FaDice } from "react-icons/fa";

import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import { moveStore } from "../../stores/move-store";
import DiceBreakdown from "../gameplay/dice-breakdown";
import Die from "../gameplay/die";
import AskModal from "./ask-modal";
import PlayerStatsModal from "./player-stats-modal";

const MobileAdditionalInfo = ({
  conversationId,
  roomData,
  currentPlayer,
}: {
  conversationId: string;
  roomData: IRoomDetail;
  currentPlayer: IPlayer;
}) => {
  const [open, setOpen] = useState(false);
  const [askModal, setAskModal] = useState(false);
  const [diceStats, setDiceStats] = useState(false);
  const [statsModal, setStatsModal] = useState(false);

  const dice = moveStore.dice.use();
  const roll = moveStore.roll.use();

  return (
    <div className="pointer-events-none relative z-10 flex h-32 w-full gap-3">
      <div
        className={cn(
          "absolute inset-0 -z-10 h-full w-full bg-gradient-to-l from-black/30 to-black to-45% opacity-0 backdrop-blur transition-all duration-500",
          open && "opacity-100",
        )}
      />
      <div className="flex h-full items-center justify-center">
        <div
          className="pointer-events-auto flex h-10 w-9 items-center justify-center rounded-r-lg border border-white/60 bg-white/50 backdrop-blur-sm"
          onClick={() => {
            if (diceStats) setDiceStats(false);
            else setOpen(!open);
          }}
        >
          {!open && <AiOutlinePlus />}
          {open && <AiOutlineLeft />}
        </div>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full flex-col justify-center gap-5 opacity-0 transition-all duration-500",
          open && "pointer-events-auto opacity-100",
        )}
      >
        <div
          className={cn(
            "opacity-100 transition-all duration-500",
            diceStats && "pointer-events-none opacity-0",
          )}
        >
          <AskModal
            conversationId={conversationId}
            open={askModal}
            onOpen={() => {
              setOpen(false);
              setAskModal(true);
            }}
            onClose={() => setAskModal(false)}
          />
        </div>
        <div className={cn("hidden h-5", diceStats && "block")}></div>
        <div
          className={cn(
            "flex flex-col gap-4",
            diceStats && "absolute inset-0 h-full w-full pb-4 pt-3.5",
          )}
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            onClick={() => setDiceStats(true)}
            className="flex items-center gap-2 text-xs uppercase"
          >
            <FaDice className="h-5 w-5" /> <p className="mt-0.5">dice roll stats</p>
          </motion.div>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex h-full w-full gap-8 pl-4 pt-[50px] opacity-0 transition-opacity duration-500",
              diceStats && "pointer-events-auto relative pt-0 opacity-100",
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-4">
                {dice.map((roll, i) => (
                  <Die small key={i} roll={roll} />
                ))}
              </div>
              <p className="text-sm font-bold">Total: {roll?.diceAfterBonus}</p>
            </div>
            <div className="flex w-40">
              <DiceBreakdown />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "opacity-100 transition-all duration-500",
            diceStats && "pointer-events-none opacity-0",
          )}
        >
          <PlayerStatsModal
            open={statsModal}
            onOpen={() => {
              setOpen(false);
              setStatsModal(true);
            }}
            onClose={() => setStatsModal(false)}
            currentPlayer={currentPlayer}
            roomData={roomData}
          />
        </div>
      </div>
    </div>
  );
};
export default MobileAdditionalInfo;
