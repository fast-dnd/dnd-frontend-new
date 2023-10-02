"use client";

import { useEffect, useState } from "react";

import { IPlayer } from "@/types/room";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Box } from "@/components/ui/box";
import Spinner from "@/components/ui/spinner";

import useGameplaySocket from "../hooks/use-gameplay-socket";
import useRewardSocket from "../hooks/use-reward-socket";
import { gameStore, PlayerChanges } from "../stores/game-store";
import DiedModal from "./died-modal";
import GameOverModal from "./game-over-modal";
import HomeModal from "./home-modal";
import PlayMove from "./play-move";
import RewardModal from "./reward-modal";
import Stories from "./stories";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;

  // const bgUrl = backgroundStore.bgUrl;

  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);
  const [gaming, setGaming] = useState(true);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [rewardModal, setRewardModal] = useState(false);
  const [dying, setDying] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [bgSet, setBgSet] = useState(false);

  const homeModal = gameStore.homeModal.use();
  const diedModal = gameStore.diedModal.use();

  const { lastStory, loadingText } = useGameplaySocket(conversationId);
  const { reward } = useRewardSocket(conversationId);

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
          gameStore.changes.set(changes);
          setTimeout(() => {
            gameStore.changes.set({});
            if (changes.lostHealth && player.health <= 0) {
              setDying(false);
              gameStore.diedModal.set(true);
            }
          }, 1500);
        }
      }
      setCurrentPlayer(player);

      if (roomData.state === "WIN" || roomData.state === "LOSE") {
        if (gaming) {
          setGaming(false);
          setGameOverModal(true);
        }
      }
    }
    // if (!dungeonData) bgUrl.set("");
    // if (dungeonData && !bgSet) {
    //   setBgSet(true);
    //   bgUrl.set(dungeonData.backgroundUrl);
    // }
  }, [currentPlayer, dungeonData, gaming, roomData]);

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
      onClickHowTo={() => gameStore.displayHowToPlay.set(true)}
      feedback
      onClickFeedback={() => gameStore.displayFeedback.set(true)}
      home
      onClickHome={() => gameStore.homeModal.set(true)}
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
      <HomeModal open={homeModal} close={() => gameStore.homeModal.set(false)} />
      <DiedModal open={diedModal} close={() => gameStore.diedModal.set(false)} />
      <GameOverModal
        open={gameOverModal && !diedModal && !dying}
        close={() => {
          setGameOverModal(false);
          setRewardModal(true);
        }}
        result={roomData.state}
        dungeon={dungeonData}
        conversationId={conversationId}
        players={roomData.playerState}
      />
      <RewardModal
        reward={reward}
        open={rewardModal && !!reward}
        close={() => setRewardModal(false)}
      />
    </Box>
  );
};

export default Gameplay;
