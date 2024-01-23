"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AiFillHeart, AiOutlineLeft } from "react-icons/ai";
import { FaDice } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";
import { PiPenNibFill } from "react-icons/pi";
import { useReadLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { IDefaultMove } from "@/types/room";
import { cn } from "@/utils/style-utils";
import { defaultMoves } from "@/validations/room";

import usePlayMove from "../../hooks/use-play-move";
import usePlayMoveSocket from "../../hooks/use-play-move-socket";
import { moveStore } from "../../stores/move-store";
import PickPowerup from "../gameplay/pick-powerup";
import { IPlayMoveProps } from "../gameplay/play-move";
import WordChallengeEntry from "../gameplay/word-challenge-entry";

const MobilePlayMove = ({ roomData, conversationId, currentPlayer }: IPlayMoveProps) => {
  usePlayMoveSocket(conversationId);
  const accountId = useReadLocalStorage<string>("accountId");
  const { onPlay, openedDetails, setOpenedDetails } = usePlayMove(
    conversationId,
    roomData,
    currentPlayer,
  );

  const wordChallengeForPlayer = roomData.wordsChallenge?.find(
    (wordChallenge) => wordChallenge.accountId === accountId,
  );

  const hide = roomData.state === "WIN" || roomData.state === "LOSE";
  const store = moveStore.use();

  if (!currentPlayer.champion) return <div>Something went wrong.</div>;

  return (
    <div
      className={cn(
        "relative border-t border-white/20 bg-black pb-6",
        !store.canPlay && "pointer-events-none",
        hide && "hidden",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 h-full w-full bg-black opacity-0 transition-all duration-200",
          !store.canPlay && "opacity-60",
        )}
      />
      <motion.header className="relative flex h-7 pl-4 pt-3">
        <AnimatePresence>
          {!openedDetails && (
            <motion.p
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              key="0"
              className="absolute text-xs font-medium uppercase tracking-wide"
            >
              Take action
            </motion.p>
          )}
          {openedDetails && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              key="1"
              className="absolute flex w-full items-center gap-3"
            >
              <AiOutlineLeft onClick={() => setOpenedDetails(false)} />
              <MoveDisplay
                action
                move={store.move || "free_will"}
                wordChallenge={!!wordChallengeForPlayer}
                className="border-0 p-0 uppercase"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <motion.section className="relative h-fit min-h-[58px]">
        <AnimatePresence>
          {!openedDetails && (
            <motion.div
              key="0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-10 flex w-full flex-col gap-3 py-3 pl-4"
            >
              <div className="absolute right-0 h-full w-12 bg-gradient-to-l from-black to-transparent" />

              <div className="flex gap-2 overflow-x-auto pr-8">
                <MoveDisplay
                  move="free_will"
                  wordChallenge={!!wordChallengeForPlayer}
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
            </motion.div>
          )}
          {openedDetails && (
            <motion.div
              key="1"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.2 }}
              className="flex w-full flex-col justify-between gap-2"
            >
              <div className="flex w-full flex-col gap-3 px-4 pt-3">
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
                ) : roomData.generateRandomWords ? (
                  wordChallengeForPlayer && (
                    <div className="flex h-full max-h-[200px] w-full flex-col overflow-y-auto">
                      <div className="inline">
                        {wordChallengeForPlayer.words.map((word, index) => (
                          <WordChallengeEntry
                            key={JSON.stringify({ ...roomData.wordsChallenge, index })}
                            index={index}
                            word={word}
                          />
                        ))}
                        <WordChallengeEntry
                          key={JSON.stringify({
                            ...roomData.wordsChallenge,
                            index: wordChallengeForPlayer.words.length,
                          })}
                          index={wordChallengeForPlayer.words.length}
                          word="."
                        />
                      </div>
                    </div>
                  )
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
                    disabled={
                      !store.canPlay ||
                      (!store.move && !store.freeWill && !store.wordsChallenge.length)
                    }
                    className="flex w-full items-center gap-1 rounded-none border-none py-1.5 text-xs"
                  >
                    <FaDice /> Roll the dice
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

interface IMoveDisplayProps {
  move: IDefaultMove | "free_will";
  onClick?: () => void;
  className?: string;
  action?: boolean;
  wordChallenge?: boolean;
}

const MoveDisplay = ({ move, onClick, className, action, wordChallenge }: IMoveDisplayProps) => {
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
      {move === "free_will" && !wordChallenge && (
        <>
          <PiPenNibFill /> Free Will
        </>
      )}
      {move === "free_will" && wordChallenge && <>Complete a Sentence</>}
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
