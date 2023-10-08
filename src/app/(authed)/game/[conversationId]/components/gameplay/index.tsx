"use client";

import { Box } from "@/components/ui/box";
import Spinner from "@/components/ui/spinner";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { backgroundStore } from "@/stores/background-store";

import useGameplaySocket from "../../hooks/use-gameplay-socket";
import useHandleGameStateChange from "../../hooks/use-handle-game-state-change";
import useHandlePlayerChanges from "../../hooks/use-handle-player-changes";
import { gameStore } from "../../stores/game-store";
import DiedModal from "../modals/died-modal";
import GameOverModal from "../modals/game-over-modal";
import HomeModal from "../modals/home-modal";
import RewardModal from "../modals/reward-modal";
import PlayMove from "./play-move";
import Stories from "./stories";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);

  const { lastStory, loadingText } = useGameplaySocket(conversationId);

  const { currentPlayer } = useHandlePlayerChanges({ roomData });

  useHandleGameStateChange({ roomData });

  if (!roomData || !dungeonData || !currentPlayer)
    return (
      <Box title="GAMEPLAY" className="flex h-full items-center justify-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );

  backgroundStore.set(dungeonData.backgroundUrl);

  return (
    // TODO: make this a div with these properties (look at transcript page and header), and remove all these properties from the Box component
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
      <HomeModal />
      <DiedModal />
      <GameOverModal
        result={roomData.state}
        dungeon={dungeonData}
        conversationId={conversationId}
        players={roomData.playerState}
      />
      <RewardModal conversationId={conversationId} />
    </Box>
  );
};

export default Gameplay;
