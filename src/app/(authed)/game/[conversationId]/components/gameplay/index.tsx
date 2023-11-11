import { useEffect } from "react";

import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { backgroundStore } from "@/stores/background-store";

import useGameplaySocket from "../../hooks/use-gameplay-socket";
import useHandleGameStateChange from "../../hooks/use-handle-game-state-change";
import useHandlePlayerStatusUpdate from "../../hooks/use-handle-player-status-update";
import DiedModal from "../modals/died-modal";
import GameOverModal from "../modals/game-over-modal";
import HomeModal from "../modals/home-modal";
import RateModal from "../modals/rate-modal";
import RewardModal from "../modals/reward-modal";
import GamePlayHeader from "./gameplay-header";
import GameplaySkeleton from "./gameplay-skeleton";
import PlayMove from "./play-move";
import Stories from "./stories";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;

  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);

  const { lastStory } = useGameplaySocket(conversationId);

  const { currentPlayer } = useHandlePlayerStatusUpdate({ roomData });

  useHandleGameStateChange({ roomData });
  useEffect(() => {
    if (dungeonData) backgroundStore.set(dungeonData.background?.url || "");
  }, [dungeonData]);

  if (!roomData || !dungeonData || !currentPlayer) return <GameplaySkeleton />;

  return (
    <div className="flex h-full w-full flex-col">
      <GamePlayHeader title={dungeonData.name} />

      <div className="flex min-h-0 flex-1 flex-col gap-8 rounded-b-md bg-glass p-5 backdrop-blur-2xl lg:px-12 lg:py-8">
        <Stories roomData={roomData} dungeonData={dungeonData} lastStory={lastStory} />
        <PlayMove
          roomData={roomData}
          conversationId={conversationId}
          currentPlayer={currentPlayer}
        />
        <HomeModal />
        <DiedModal state={roomData.state} />
        <GameOverModal
          result={roomData.state}
          dungeon={dungeonData}
          players={roomData.playerState}
        />
        <RateModal dungeon={dungeonData} conversationId={conversationId} />
        <RewardModal conversationId={conversationId} />
      </div>
    </div>
  );
};

export default Gameplay;
