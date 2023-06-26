"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/text-area";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { IPlayMove, IPlayMoveResponse } from "@/services/game-service";
import { IPlayer, defaultMoves } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { FaDice, FaRobot } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import useGameplaySocket from "../hooks/use-gameplay-socket";
import usePlayMove from "../hooks/use-play-move";
import { useGameStore } from "../stores/game-store";
import { randomDice } from "../utils/dice";
import Die from "./die";
import StyledAudio from "./styled-audio";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

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
  const [stories, setStories] = useState<string[]>([]);
  const [imageModal, setImageModal] = useState("");

  const {
    canPlay,
    setCanPlay,
    lastStory,
    move,
    setMove,
    loadingText,
    rollButtonState,
    setRollButtonState,
  } = useGameplaySocket(conversationId);
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
      if (roomData.queuedMoves && roomData.queuedMoves.length > 0) {
        const currentPlayerMove = roomData.queuedMoves.find(
          (move) => move.playerAccountId === player?.accountId,
        );
        if (currentPlayerMove) {
          setCanPlay(false);
        }
      } else if (!lastStory && rollButtonState !== "ROLLING") {
        setCanPlay(true);
        setRollButtonState("ROLL");
      }
      if (lastStory) {
        setStories([...roomData.chatGptResponses, lastStory]);
      } else if (roomData.chatGptResponses.length >= roomData.currentRound + 1) {
        setStories(roomData.chatGptResponses);
      }

      //TODO setRollInfo of most recent move, when move format contains all required fields

      if (roomData.state === "CLOSED") setCanPlay(false);
    }
  }, [
    canPlay,
    lastStory,
    powerUp,
    roomData,
    setCanPlay,
    rollButtonState,
    setRollButtonState,
    submitting,
  ]);

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
  }, [stories, roomData, lastStory]);

  if (!roomData || !dungeonData || !currentPlayer)
    return (
      <Box title="" className="flex h-full justify-center items-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );

  const onPlay = () => {
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
      setRollButtonState("ROLLING");
      setCanPlay(false);
      playMove(moveToPlay, {
        onSuccess: (res) => {
          setFreeWill("");
          setRollInfo(res.data);
          setTimeout(() => setRollButtonState("ROLLED"), 1500);
          setTimeout(() => setDice(randomDice(res.data.diceAfterBonus)), 250);
        },
        onError: () => {
          setRollButtonState("ROLLED");
          setCanPlay(true);
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
      loading={loadingText}
      className="flex flex-col min-h-0 flex-1 gap-8 px-12 py-8"
    >
      <div className="w-full flex flex-col flex-1 gap-8 pr-6 overflow-y-auto">
        {stories.map((story, i) => (
          <div key={story} className="flex flex-col gap-8 w-full">
            <div className="w-full flex gap-8 items-center">
              <div className="font-semibold text-2xl tracking-[0.2em] uppercase">
                <span className="text-tomato mr-2">TURN {i + 1}.</span>
                {dungeonData.locations[Math.floor(i / 2)]?.name}
              </div>
              <div className="flex-1 border-t border-tomato" />
            </div>
            <div>
              {roomData.genrateImages && i % 2 === 0 && (
                <div className="h-72 w-72 inline-block float-left mr-6 mb-4">
                  {!!roomData.generatedImages[i] && (
                    <Image
                      src={roomData.generatedImages[i] || "/images/default-dungeon.png"}
                      alt="dungeon"
                      height={280}
                      width={280}
                      className="h-72 w-72"
                      draggable={false}
                      onClick={() => setImageModal(roomData.generatedImages[i])}
                    />
                  )}
                  {!roomData.generatedImages[i] && (
                    <div className="flex items-center justify-center animate-pulse h-72 w-72 rounded  bg-gray-600">
                      <svg
                        className="w-24 h-24 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              <div className="text-[22px] leading-8 tracking-widest">
                {roomData.generateAudio && (
                  <div className="mb-4">
                    <StyledAudio audio={roomData.generatedAudio[i]} />
                  </div>
                )}
                {story}
              </div>
            </div>
          </div>
        ))}
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
            {((rollInfo?.diceAfterBonus || 0) >= 2 || submitting) && (
              <>
                {rollButtonState === "ROLLING" &&
                  dice.map((roll, i) => <Die key={i} roll={roll} />)}

                {!!rollInfo && rollButtonState !== "ROLLING" && (
                  <div className="flex flex-col w-full px-4">
                    <div className="flex w-full justify-between">
                      <div className="flex items-center gap-2">
                        <FaDice /> You rolled
                      </div>
                      <p>{rollInfo.diceBreakdown.dice}</p>
                    </div>
                    <div className="flex w-full justify-between opacity-50">
                      <div className="flex items-center gap-2">
                        <BsFillArrowRightSquareFill /> Round bonus
                      </div>
                      <p>
                        {rollInfo.diceBreakdown.bonusApplied > 0 && "+"}
                        {rollInfo.diceBreakdown.bonusApplied}
                      </p>
                    </div>
                    <div className="flex w-full justify-between opacity-50">
                      <div className="flex items-center gap-2">
                        <FaRobot /> Bob gave
                      </div>
                      <p>
                        {rollInfo.diceBreakdown.aiDiceBonus > 0 && "+"}
                        {rollInfo.diceBreakdown.aiDiceBonus}
                      </p>
                    </div>
                    <div className="flex w-full justify-between opacity-50">
                      <div className="flex items-center gap-2">
                        <HiSparkles /> Mana used
                      </div>
                      <p>
                        {rollInfo.diceBreakdown.mana > 0 && "+"}
                        {rollInfo.diceBreakdown.mana}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <Button
            disabled={
              !canPlay ||
              (!move && roomData.location.phase === "discovery") ||
              (!freeWill && roomData.location.phase === "end")
            }
            className={cn(
              "h-12 normal-case",
              rollButtonState !== "ROLL" && "bg-white/5 text-white",
            )}
            onClick={onPlay}
          >
            {rollButtonState === "ROLL" && <p className="text-center">Roll the dice</p>}
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
      <Modal
        className="outline-none"
        tabIndex={0}
        open={Boolean(imageModal)}
        onClose={() => setImageModal("")}
      >
        <Image
          src={imageModal}
          alt="image-modal"
          className="w-full h-full object-cover"
          height={280}
          width={280}
        />
      </Modal>
    </Box>
  );
};

export default Gameplay;
