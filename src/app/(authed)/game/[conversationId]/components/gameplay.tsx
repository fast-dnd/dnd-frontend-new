"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { IPlayer, defaultMoves } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Die from "./die";
import Spinner from "@/components/ui/spinner";
import usePlayMove from "../hooks/use-play-move";
import { IPlayMove, IPlayMoveResponse } from "@/services/game-service";
import useGameplaySocket from "../hooks/use-gameplay-socket";
import { randomDice } from "../utils/dice";
import StyledAudio from "./styled-audio";
import { useGameStore } from "../stores/game-store";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { HiOutlineX } from "react-icons/hi";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const router = useRouter();
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);

  const { setDisplayHowToPlay, setDisplayFeedback } = useGameStore((store) => store);

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [powerUp, setPowerUp] = useState(0);
  const [freeWill, setFreeWill] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [dice, setDice] = useState([0, 0]);
  const [rollInfo, setRollInfo] = useState<IPlayMoveResponse>();
  const [openBreakdown, setOpenBreakdown] = useState(false);
  const [diceTotal, setDiceTotal] = useState(0);

  const { canPlay, setCanPlay, lastStory, move, setMove } = useGameplaySocket(conversationId);
  const { mutate: playMove, isLoading: submitting } = usePlayMove();

  useEffect(() => {
    if (roomData) {
      const player = roomData.playerState.find(
        (player) => player.accountId === localStorage.getItem("accountId"),
      );
      setCurrentPlayer(player);
      if ((player?.mana || 0) < powerUp) {
        setPowerUp(0);
      }
      if ((player?.health || 0) <= 0) setCanPlay(false);
      if (lastStory) {
        setTimer(0);
      } else if (roomData.roundEndsAt) {
        const endsAt = new Date(roomData.roundEndsAt);
        setTimer(Math.max(Math.floor((endsAt.getTime() - new Date().getTime()) / 1000), 0));
      }
      if (roomData.queuedMoves) {
        if (
          roomData.queuedMoves.find(
            (move) => move.playerAccountId === localStorage.getItem("accountId"),
          )
        ) {
          setCanPlay(false);
        } else if (!lastStory) {
          setCanPlay(true);
        }
      }

      if (roomData.state === "CLOSED") setCanPlay(false);
    }
  }, [canPlay, lastStory, powerUp, roomData, setCanPlay, submitting]);

  useEffect(() => {
    submitting && setTimeout(() => setDice(randomDice()), 200);
  }, [dice, submitting]);

  useEffect(() => {
    const interval = setInterval(() => {
      timer > 0 && !lastStory && setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastStory, timer]);

  const timeToDisplay = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${("0" + seconds).slice(-2)}`;
  };

  const autoBottomScrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoBottomScrollDiv.current) {
      autoBottomScrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [roomData?.chatGptResponses, roomData?.generatedImages, lastStory]);

  if (!roomData || !dungeonData || !currentPlayer)
    return (
      <Box title="" className="flex h-full justify-center items-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );

  const play = () => {
    setFreeWill("");
    let moveToPlay: IPlayMove | undefined;
    if (roomData.location.phase === "discovery" && move) {
      moveToPlay = {
        conversationId,
        mana: 0,
        moveType: move,
        playerId: currentPlayer.accountId,
        message: "",
      };
    } else if (roomData.location.phase === "end") {
      moveToPlay = {
        conversationId,
        mana: powerUp,
        moveType: "free_will",
        message: freeWill,
        playerId: currentPlayer.accountId,
      };
    }
    if (moveToPlay) {
      setCanPlay(false);
      playMove(moveToPlay, {
        onSuccess: (res) => {
          setDiceTotal(res.data.diceAfterBonus);
          setRollInfo(res.data);
          setTimeout(() => setDice(randomDice(res.data.diceAfterBonus)), 250);
        },
      });
    }
  };
  return (
    <Box
      title={dungeonData.name}
      howTo
      onClickHowTo={() => setDisplayHowToPlay(true)}
      feedback
      onClickFeedback={() => setDisplayFeedback(true)}
      home
      onClickHome={() => {
        router.push("/home");
      }}
      className="flex flex-col min-h-0 flex-1 gap-8 px-12 py-8"
    >
      <div className="w-full flex flex-col flex-1 gap-8 pr-6 overflow-y-auto">
        {(lastStory ? [...roomData.chatGptResponses, lastStory] : roomData.chatGptResponses).map(
          (story, i) => (
            <div key={story} className="flex flex-col gap-8 w-full">
              <div className="w-full flex gap-8 items-center">
                <div className="font-semibold text-2xl tracking-[0.2em] uppercase">
                  <span className="text-tomato mr-2">TURN {i + 1}.</span>
                  {dungeonData.locations[Math.floor(i / 2)]?.name}
                </div>
                <div className="flex-1 border-t border-tomato" />
              </div>
              <div className="flex gap-8">
                {roomData.genrateImages && (
                  <div className="h-72 w-72 flex flex-shrink-0">
                    {!!roomData.generatedImages[i] && (
                      <Image
                        src={roomData.generatedImages[i] || "/images/default-dungeon.png"}
                        alt="dungeon"
                        height={280}
                        width={280}
                        className="h-72 w-72"
                        draggable={false}
                      />
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {roomData.generateAudio && roomData.generatedAudio[i] && (
                    <StyledAudio audio={roomData.generatedAudio[i]} />
                  )}
                  <div className="text-[22px] leading-8 tracking-widest">{story}</div>
                </div>
              </div>
            </div>
          ),
        )}
        <div ref={autoBottomScrollDiv} />
      </div>
      <div className="flex gap-8 w-full">
        {roomData.location.phase === "discovery" && (
          <div className="flex flex-col flex-1 gap-4">
            <div
              className={cn(
                "py-2.5 px-8 text-center bg-white/5 text-xl tracking-[0.07em] indent-[0.07em]",
                !canPlay && "text-white/50",
              )}
            >
              <span className="font-semibold">Choose an action</span> - {timeToDisplay()} Left
            </div>
            <div className="flex gap-4 w-full flex-wrap">
              {defaultMoves.map((dMove) => (
                <Button
                  key={dMove}
                  variant="ghost"
                  disabled={!canPlay}
                  className={cn(
                    "border-white/25 flex-1 h-12 basis-1/3 normal-case text-white px-2",
                    dMove === move && "border-tomato border-2",
                    currentPlayer.champion.moveMapping[dMove].length > 24 && "text-sm",
                    currentPlayer.champion.moveMapping[dMove].length > 48 && "text-xs",
                  )}
                  onClick={() => setMove(dMove)}
                >
                  {currentPlayer.champion.moveMapping[dMove]}
                </Button>
              ))}
            </div>
          </div>
        )}
        {roomData.location.phase === "end" && (
          <div className="flex flex-col h-full flex-1 gap-4">
            <div
              className={cn(
                "py-2.5 px-8 text-center bg-white/5 text-xl tracking-[0.07em] indent-[0.07em]",
                !canPlay && "text-white/50",
              )}
            >
              <span className="font-semibold">Type your move and select a power up</span> -{" "}
              {timeToDisplay()} Left
            </div>
            <div className="flex gap-4 h-full">
              <TextArea
                className="m-0 h-full border-white/50"
                placeholder="I found a secret tunnel and escape through it..."
                disabled={!canPlay}
                onChange={(e) => setFreeWill(e.target.value)}
                value={freeWill}
              />
              <div className="flex w-[72px] flex-col gap-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <Button
                    variant="ghost"
                    key={i}
                    disabled={!canPlay || currentPlayer.mana < i}
                    className={cn(
                      "font-semibold h-8 text-white bg-white/5 tracking-[0.2em]",
                      powerUp === i && "border-tomato",
                    )}
                    onClick={() => setPowerUp(i)}
                  >
                    +{i}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between bg-white/5 w-[270px]">
          <div className="flex items-center relative justify-center gap-4 h-32">
            {(diceTotal >= 2 || submitting) && (
              <>
                {dice.map((roll, i) => (
                  <Die key={i} roll={roll} />
                ))}

                <div className="absolute bottom-4 right-4 h-4 w-4">
                  <AiOutlineQuestionCircle
                    className="cursor-pointer"
                    onClick={() => setOpenBreakdown(true)}
                  />
                  {openBreakdown && (
                    <div
                      tabIndex={0}
                      onBlur={() => setOpenBreakdown(false)}
                      className="flex justify-center w-full absolute bottom-5"
                    >
                      <div className="flex flex-col bg-black/30 whitespace-nowrap p-4 border border-white rounded-lg ">
                        <div className="flex justify-end">
                          <HiOutlineX
                            className="cursor-pointer"
                            onClick={() => setOpenBreakdown(false)}
                          />
                        </div>
                        <p>Rolled: {rollInfo?.diceBreakdown.dice}</p>
                        <p>Bonus applied: {rollInfo?.diceBreakdown.bonusApplied}</p>
                        <p>Mana used: {rollInfo?.diceBreakdown.mana}</p>
                        <p>Bob thought: {rollInfo?.diceBreakdown.aiDiceBonus}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <Button
            disabled={
              !canPlay ||
              (!move && roomData.location.phase === "discovery") ||
              (!freeWill && roomData.location.phase === "end")
            }
            className={cn("h-12 normal-case", !canPlay && "bg-white/5 text-white")}
            onClick={play}
          >
            {canPlay ? "Roll the dice" : `Dice total: ${!submitting ? diceTotal : ""}`}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Gameplay;
