"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IPlayer } from "@/types/game";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner";

import useGameplaySocket from "../hooks/use-gameplay-socket";
import { PlayerChanges, useGameStore } from "../stores/game-store";
import PlayMove from "./play-move";
import Player from "./player";
import Stories from "./stories";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const router = useRouter();
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);
  const [gaming, setGaming] = useState(true);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [result, setResult] = useState<"GAMING" | "WON" | "LOST">("GAMING");
  const [dying, setDying] = useState(false);
  const [goingHome, setGoingHome] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();

  const {
    setDisplayHowToPlay,
    setDisplayFeedback,
    homeModal,
    setHomeModal,
    diedModal,
    setDiedModal,
    setChanges,
  } = useGameStore((store) => store);

  const { lastStory, loadingText } = useGameplaySocket(conversationId);

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

      //TODO setRollInfo of most recent move, when move format contains all required fields

      if (roomData.state === "CLOSED") {
        if (roomData.playerState.every((player) => player.health > 0)) {
          setResult("WON");
        } else setResult("LOST");
        if (gaming) {
          setGaming(false);
          setGameOverModal(true);
        }
      }
    }
  }, [roomData, currentPlayer, setChanges, setDiedModal, gaming, setGameOverModal, loadingText]);

  if (!roomData || !dungeonData || !currentPlayer)
    return (
      <Box title="GAMEPLAY" className="flex h-full items-center justify-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );

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
      <Stories roomData={roomData} dungeonData={dungeonData} lastStory={lastStory} />
      <PlayMove
        roomData={roomData}
        conversationId={conversationId}
        currentPlayer={currentPlayer}
        loadingText={loadingText}
      />
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
