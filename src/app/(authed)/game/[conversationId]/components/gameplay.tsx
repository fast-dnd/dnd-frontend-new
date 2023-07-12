"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaDice, FaRobot } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { IPlayer } from "@/types/dnd";
import { IPlayMove, IPlayMoveResponse } from "@/services/game-service";
import { cn } from "@/utils/style-utils";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/text-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import useGameplaySocket from "../hooks/use-gameplay-socket";
import usePlayMove from "../hooks/use-play-move";
import { PlayerChanges, useGameStore } from "../stores/game-store";
import { randomDice } from "../utils/dice";
import Die from "./die";
import StyledAudio from "./styled-audio";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const router = useRouter();
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);

  const { setDisplayHowToPlay, setDisplayFeedback, homeModal, setHomeModal, setChanges } =
    useGameStore((store) => store);

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [powerUp, setPowerUp] = useState(0);
  const [freeWill, setFreeWill] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [dice, setDice] = useState([0, 0]);
  const [rollInfo, setRollInfo] = useState<IPlayMoveResponse>();
  const [stories, setStories] = useState<string[]>([]);

  const [imageModal, setImageModal] = useState("");
  const [goingHome, setGoingHome] = useState(false);

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
      if (currentPlayer && player) {
        const changes: PlayerChanges = {};
        if (player.health !== currentPlayer.health) {
          if (currentPlayer.health > player.health) {
            changes.lostHealth = true;
          } else {
            changes.gainedHealth = true;
          }
        }
        if (player.mana !== currentPlayer.mana) {
          changes.gainedMana = true;
        }
        if (player.bonusForNextRound !== currentPlayer.bonusForNextRound) {
          changes.gainedBonus = true;
        }
        if (player.gold !== currentPlayer.gold) {
          changes.gainedGold = true;
        }
        if (Object.keys(changes).length) {
          setChanges(changes);
          setTimeout(() => {
            setChanges({});
          }, 1000);
        }
      }
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
        setRollButtonState("CANPLAY");
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
    currentPlayer,
    setChanges,
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
      <Box title="GAMEPLAY" className="flex h-full items-center justify-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );

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
          setRollInfo(res.data);
          setTimeout(() => setRollButtonState("ROLLED"), 1500);
          setTimeout(() => setDice(randomDice(res.data.diceAfterBonus)), 250);
        },
        onError: () => {
          setRollButtonState("CANPLAY");
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
      onClickHome={() => setHomeModal(true)}
      loading={loadingText}
      className="flex min-h-0 flex-1 flex-col gap-8 p-5 lg:px-12 lg:py-8"
    >
      <div className="flex  w-full flex-1 flex-col gap-8 pr-4 lg:max-h-full lg:overflow-y-auto lg:pr-6">
        {stories.map((story, i) => (
          <div key={story} className="flex w-full flex-col gap-8">
            <div className="flex w-full items-center gap-8">
              <div className="flex flex-col text-lg font-semibold uppercase tracking-[0.2em] lg:flex-row lg:text-2xl">
                <span className="mr-2 text-tomato">TURN {i + 1}.</span>
                <span>{dungeonData.locations[Math.floor(i / 2)]?.name}</span>
              </div>
              <div className="border-t border-tomato lg:flex-1" />
            </div>
            <div>
              {roomData.generatedImages[i] && roomData.generateImages && i % 2 === 0 && (
                <div className="mb-4 flex aspect-square w-full justify-center lg:float-left lg:mr-6 lg:inline-block lg:h-72 lg:w-72">
                  {roomData.generatedImages[i].length > 0 ? (
                    <Image
                      src={roomData.generatedImages[i] || "/images/default-dungeon.png"}
                      alt="dungeon"
                      height={2048}
                      width={2048}
                      className="w-full"
                      draggable={false}
                      onClick={() => setImageModal(roomData.generatedImages[i])}
                    />
                  ) : (
                    <div className="flex h-full w-full animate-pulse items-center justify-center rounded bg-gray-600">
                      <svg
                        className="h-24 w-24 text-gray-200"
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

              <div className="tracking-widest lg:text-[22px] lg:leading-8">
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
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="flex h-full flex-1 flex-col gap-6">
          <div
            className={cn(
              "bg-white/5 px-8 py-2.5 text-xl uppercase tracking-[0.07em]",
              !canPlay && "text-white/50",
            )}
          >
            <span className="font-semibold">Type or select your move</span>
            <span className="opacity-50"> - {timeToDisplay()} Left</span>
          </div>
          <div className="relative flex h-52 lg:h-full">
            <TextArea
              maxLength={300}
              className="m-0 h-full border-white/50"
              placeholder="I found a secret tunnel and escape through it..."
              disabled={!canPlay}
              onChange={(e) => {
                setFreeWill(e.target.value);
                setMove(undefined);
              }}
              value={move ? currentPlayer.champion.moveMapping[move] : freeWill}
            />
            <div className="pointer-events-none absolute bottom-4 flex w-full justify-between  px-4">
              <div className="flex h-9 gap-2">
                <Button
                  variant="ghost"
                  disabled={!canPlay}
                  className={cn(
                    "pointer-events-auto h-9 w-9 bg-white/5 text-white",
                    move === "discover_health" && "border-tomato",
                  )}
                  onClick={() => setMove("discover_health")}
                >
                  <AiFillHeart />
                </Button>
                <Button
                  variant="ghost"
                  disabled={!canPlay}
                  className={cn(
                    "pointer-events-auto h-9 w-9 bg-white/5 text-white",
                    move === "discover_mana" && "border-tomato",
                  )}
                  onClick={() => setMove("discover_mana")}
                >
                  <HiSparkles />
                </Button>
                <Button
                  variant="ghost"
                  disabled={!canPlay}
                  className={cn(
                    "pointer-events-auto h-9 w-9 bg-white/5 text-white",
                    move === "conversation_with_team" && "border-tomato",
                  )}
                  onClick={() => setMove("conversation_with_team")}
                >
                  <GoPeople />
                </Button>
                <Button
                  variant="ghost"
                  disabled={!canPlay}
                  className={cn(
                    "pointer-events-auto h-9 w-9 bg-white/5 text-white",
                    move === "rest" && "border-tomato",
                  )}
                  onClick={() => setMove("rest")}
                >
                  <GiNightSleep />
                </Button>
              </div>
              <Button
                variant="ghost"
                disabled={!canPlay}
                className={cn(
                  "pointer-events-auto h-9 w-fit bg-white/5 px-4 normal-case text-white",
                  !move && "border-tomato",
                )}
                onClick={() => setMove(undefined)}
              >
                Use free will
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div
            className={cn(
              "flex h-12 w-full items-center justify-between bg-white/5",
              rollButtonState !== "CANPLAY" && "opacity-50",
            )}
          >
            <Button
              variant="ghost"
              disabled={powerUp === 0 || !canPlay}
              onClick={() => setPowerUp(powerUp - 1)}
              className="flex h-full w-12 items-center justify-center bg-white/10 text-4xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="3"
                viewBox="0 0 17 3"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.664062 1.47928C0.664062 1.17618 0.78447 0.885488 0.998798 0.671161C1.21312 0.456834 1.50382 0.336426 1.80692 0.336426H15.5212C15.8243 0.336426 16.115 0.456834 16.3293 0.671161C16.5437 0.885488 16.6641 1.17618 16.6641 1.47928C16.6641 1.78239 16.5437 2.07308 16.3293 2.2874C16.115 2.50173 15.8243 2.62214 15.5212 2.62214H1.80692C1.50382 2.62214 1.21312 2.50173 0.998798 2.2874C0.78447 2.07308 0.664063 1.78239 0.664062 1.47928Z"
                  fill="white"
                />
              </svg>
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
              className="flex h-full w-12 items-center justify-center bg-white/10 text-4xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.66406 0.479492C8.96717 0.479492 9.25786 0.5999 9.47219 0.814227C9.68651 1.02855 9.80692 1.31924 9.80692 1.62235V7.33664H15.5212C15.8243 7.33664 16.115 7.45704 16.3293 7.67137C16.5437 7.8857 16.6641 8.17639 16.6641 8.47949C16.6641 8.7826 16.5437 9.07329 16.3293 9.28761C16.115 9.50194 15.8243 9.62235 15.5212 9.62235H9.80692V15.3366C9.80692 15.6397 9.68651 15.9304 9.47219 16.1448C9.25786 16.3591 8.96717 16.4795 8.66406 16.4795C8.36096 16.4795 8.07027 16.3591 7.85594 16.1448C7.64161 15.9304 7.52121 15.6397 7.52121 15.3366V9.62235H1.80692C1.50382 9.62235 1.21312 9.50194 0.998798 9.28761C0.78447 9.07329 0.664063 8.7826 0.664062 8.47949C0.664062 8.17639 0.78447 7.8857 0.998798 7.67137C1.21312 7.45704 1.50382 7.33664 1.80692 7.33664H7.52121V1.62235C7.52121 1.31924 7.64161 1.02855 7.85594 0.814227C8.07027 0.5999 8.36096 0.479492 8.66406 0.479492Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
          <div className="flex flex-col justify-between bg-white/5 lg:w-[270px]">
            <div className="relative flex h-28 items-center justify-center gap-4">
              {((rollInfo?.diceAfterBonus || 0) >= 2 || submitting) && (
                <>
                  {rollButtonState === "ROLLING" &&
                    dice.map((roll, i) => <Die key={i} roll={roll} />)}

                  {!!rollInfo && rollButtonState !== "ROLLING" && (
                    <div className="flex w-full flex-col px-4">
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
              disabled={!canPlay || (!move && !freeWill)}
              className={cn(
                "h-12 normal-case",
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

      <Modal
        className="outline-none"
        tabIndex={0}
        open={Boolean(imageModal)}
        onClose={() => setImageModal("")}
      >
        <Image
          src={imageModal}
          alt="image-modal"
          className="h-full w-full object-cover"
          height={280}
          width={280}
        />
      </Modal>

      <Modal
        open={homeModal}
        onClose={() => setHomeModal(false)}
        className="flex h-fit w-fit flex-col items-center gap-8 bg-black/90 px-6 py-8 text-lg shadow-xl shadow-white/10 lg:px-12 lg:text-xl"
      >
        <p className="text-center font-medium uppercase leading-7 tracking-[3.3px]">
          Leave the game?
        </p>
        <p className="text-center leading-7 tracking-[2.64px] text-white/60">
          Stepping away? Remember, each game phase waits for 10 minutes. Miss it, and face a loss.
        </p>
        <div className="flex flex-row justify-center gap-8">
          <Button
            className="w-fit px-16 py-3"
            variant="outline"
            onClick={() => {
              setGoingHome(true);
              setHomeModal(false);
              router.push("/home");
            }}
          >
            {goingHome && <Spinner className="m-0 h-4 w-4" />}
            EXIT GAME
          </Button>
          <Button className="w-fit whitespace-nowrap px-8 py-3" onClick={() => setHomeModal(false)}>
            STAY AND PLAY
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default Gameplay;
