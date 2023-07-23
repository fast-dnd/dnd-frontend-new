"use client";

import { useEffect, useState } from "react";

import { IGamePlayer } from "@/types/game";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetGameData from "@/hooks/use-get-game-data";
import { Box } from "@/components/ui/box";
import Spinner from "@/components/ui/spinner";

import useGameplaySocket from "../hooks/use-gameplay-socket";
import { PlayerChanges, useGameStore } from "../stores/game-store";
import DiedModal from "./died-modal";
import GameOverModal from "./game-over-modal";
import HomeModal from "./home-modal";
import PlayMove from "./play-move";
import Stories from "./stories";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { data: roomData } = useGetGameData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);
  const [gaming, setGaming] = useState(true);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [result, setResult] = useState<"GAMING" | "WON" | "LOST">("GAMING");
  const [dying, setDying] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<IGamePlayer>();

  const {
    setDisplayHowToPlay,
    setDisplayFeedback,
    homeModal,
    setHomeModal,
    diedModal,
    setDiedModal,
    setChanges,
  } = useGameStore((state) => state);

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
      <HomeModal open={homeModal} close={() => setHomeModal(false)} />
      <DiedModal open={diedModal} close={() => setDiedModal(false)} />
      <GameOverModal
        open={gameOverModal && !diedModal && !dying}
        close={() => setGameOverModal(false)}
        result={result}
        dungeonName={dungeonData.name}
        players={roomData.playerState}
      />
    </Box>
  );
};

export default Gameplay;
