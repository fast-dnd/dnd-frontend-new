"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaDice, FaRobot } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { IPlayer, IPlayMove, IPlayMoveResponse } from "@/types/game";
import { cn } from "@/utils/style-utils";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/text-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SkeletonIcon from "@/components/icons/skeleton-icon";

import useGameplaySocket from "../hooks/use-gameplay-socket";
import usePlayMove from "../hooks/use-play-move";
import { PlayerChanges, useGameStore } from "../stores/game-store";
import { randomDice } from "../utils/dice";
import Die from "./die";
import Player from "./player";
import StyledAudio from "./styled-audio";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const router = useRouter();
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);
  const [gaming, setGaming] = useState(true);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [result, setResult] = useState<"GAMING" | "WON" | "LOST">("GAMING");

  const {
    setDisplayHowToPlay,
    setDisplayFeedback,
    homeModal,
    setHomeModal,
    diedModal,
    setDiedModal,
    setChanges,
  } = useGameStore((store) => store);

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [powerUp, setPowerUp] = useState(0);
  const [freeWill, setFreeWill] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [dice, setDice] = useState([0, 0]);
  const [rollInfo, setRollInfo] = useState<IPlayMoveResponse>();
  const [stories, setStories] = useState<string[]>([]);
  const [dying, setDying] = useState(false);

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
        if (changes.lostHealth && player.health <= 0) setDying(true);
        if (Object.keys(changes).length) {
          setChanges(changes);
          setTimeout(() => {
            setChanges({});
            if (changes.lostHealth && player.health <= 0) {
              setDying(false);
              setDiedModal(true);
            }
          }, 1500);
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

      if (roomData.state === "CLOSED") {
        setCanPlay(false);
        if (roomData.playerState.every((player) => player.health > 0)) {
          setResult("WON");
        } else setResult("LOST");
        if (gaming) {
          setGaming(false);
          setGameOverModal(true);
        }
      }
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
    setDiedModal,
    gaming,
    setGameOverModal,
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
          <div key={i} className="flex w-full flex-col gap-8">
            <div className="flex w-full items-center gap-8">
              <div className="flex flex-col text-lg font-semibold uppercase tracking-[0.2em] lg:flex-row lg:text-2xl">
                <span className="mr-2 text-tomato">
                  TURN {i + 1}/{roomData.maxRounds + 1}.
                </span>
                <span>{dungeonData.locations[Math.floor(i / 2)]?.name}</span>
              </div>
              <div className="border-t border-tomato lg:flex-1" />
            </div>
            <div className="w-full">
              {roomData.generateImages && i % 2 === 0 && (
                <div className="mb-4 flex aspect-square w-full shrink-0 justify-center lg:float-left lg:mr-6 lg:inline-block lg:h-72 lg:w-72">
                  {roomData.generatedImages[i] && roomData.generatedImages[i].length > 0 ? (
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
                      <SkeletonIcon className="h-24 w-24 text-gray-200" />
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
      <div
        className={cn(
          "flex w-full flex-col gap-8 lg:flex-row",
          (roomData.state === "CLOSED" || currentPlayer.health <= 0) && "hidden",
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
          <div className="relative flex h-60 lg:h-full">
            <TextArea
              maxLength={300}
              center={!!move}
              className="m-0 h-full border-white/50"
              placeholder="I found a secret tunnel and escape through it..."
              disabled={!canPlay}
              onChange={(e) => {
                setFreeWill(e.target.value);
                setMove(undefined);
              }}
              value={move ? currentPlayer.champion.moveMapping[move] : freeWill}
            />
            <div className="pointer-events-none absolute bottom-4 flex w-full flex-col justify-between gap-2 px-4  lg:flex-row">
              <div className="flex h-9 justify-between gap-2 lg:justify-start">
                <Button
                  variant="ghost"
                  disabled={!canPlay}
                  className={cn(
                    "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
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
                    "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
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
                    "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
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
                    "pointer-events-auto h-9 w-9 shrink grow bg-white/5 text-white lg:shrink-0 lg:grow-0",
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
                  "pointer-events-auto h-9 bg-white/5 px-4 normal-case text-white lg:w-fit",
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
              rollButtonState !== "CANPLAY" && "hidden opacity-50 lg:flex",
            )}
          >
            <Button
              variant="ghost"
              disabled={powerUp === 0 || !canPlay}
              onClick={() => setPowerUp(powerUp - 1)}
              className="flex h-full w-12 items-center justify-center bg-white/10 text-white"
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
              className="flex h-full w-12 items-center justify-center bg-white/10 text-white"
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

      {currentPlayer.health <= 0 && roomData.state !== "CLOSED" && (
        <div className="flex h-44 w-full flex-col items-center justify-center bg-white/5 lg:text-xl">
          <p className="text-center font-semibold">Players are choosing their actions...</p>
          <p>{timeToDisplay()} Left</p>
        </div>
      )}

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
        <div className="flex flex-row justify-center gap-4 lg:gap-8">
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base lg:px-16 lg:text-xl"
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
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base lg:px-8 lg:text-xl"
            onClick={() => setHomeModal(false)}
          >
            STAY AND PLAY
          </Button>
        </div>
      </Modal>
      <Modal
        open={diedModal}
        onClose={() => setDiedModal(false)}
        className="mx-8 flex h-fit w-fit flex-col items-center gap-8 bg-black/90 px-6 py-8 text-lg shadow-xl shadow-white/10 lg:px-12 lg:text-xl"
      >
        <p className="text-center font-medium uppercase leading-7 tracking-[3.3px]">You are dead</p>
        <p className="text-center leading-7 tracking-[2.64px] text-white/60">
          You have tried with all your might, but you have been defeated.
        </p>
        <Button
          className="whitespace-nowrap px-8 py-3 uppercase"
          onClick={() => setDiedModal(false)}
        >
          spectate
        </Button>
      </Modal>
      <Modal
        open={gameOverModal && !diedModal && !dying}
        onClose={() => setGameOverModal(false)}
        className="mx-8 flex h-fit max-h-[700px] w-fit flex-col items-center gap-6 bg-black/90 px-6 py-8 text-lg shadow-xl shadow-white/10 lg:max-w-[550px] lg:gap-8 lg:px-12 lg:text-xl"
      >
        <div className="flex flex-col gap-3 lg:gap-4">
          <p className="text-center font-medium uppercase leading-7 tracking-[3.3px]">
            {result === "WON" && "Game finished"}
            {result === "LOST" && "You failed"}
          </p>
          <p className="text-center leading-7 tracking-[2.64px] text-white/60">
            {result === "WON" && (
              <span>
                You have completed <span className="font-semibold">{dungeonData.name}</span>
              </span>
            )}
            {result === "LOST" && (
              <span>
                You and your teammates have died in the adventure.
                <span className="font-semibold"> Better luck next time!</span>
              </span>
            )}
          </p>
        </div>

        <div className="w-full border-t border-white/25" />
        <div className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-scroll lg:gap-8">
          {roomData.playerState.map((player) => (
            <Player key={player.accountId} player={player} />
          ))}
        </div>
        <div className="flex w-full flex-wrap justify-between gap-6">
          <Button
            variant="outline"
            className="flex w-fit flex-1 border-tomato px-8 text-base lg:text-xl"
            onClick={() => {
              setGameOverModal(false);
            }}
          >
            CLOSE
          </Button>
          <Button
            variant="primary"
            className="flex w-fit flex-1 whitespace-nowrap px-8 text-base lg:text-xl"
            onClick={() => {
              setGoingHome(true);
              setGameOverModal(false);
              router.push("/home");
            }}
          >
            GO HOME
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default Gameplay;
