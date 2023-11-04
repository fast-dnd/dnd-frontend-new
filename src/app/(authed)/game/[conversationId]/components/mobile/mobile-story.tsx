import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import useGetRoomData from "@/hooks/queries/use-get-room-data";

import useGameplaySocket from "../../hooks/use-gameplay-socket";
import useHandlePlayerStatusUpdate from "../../hooks/use-handle-player-status-update";
import Stories from "../gameplay/stories";
import AdventureHeader from "./adventure-header";

const MobileStory = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: adventureData } = useGetDungeon(roomData?.dungeonId);
  const { currentPlayer } = useHandlePlayerStatusUpdate({ roomData });

  const { lastStory, loadingText } = useGameplaySocket(conversationId);

  if (!roomData || !adventureData || !currentPlayer) return <div>todo</div>;

  return (
    <div className="flex flex-col">
      <AdventureHeader
        roomData={roomData}
        adventure={adventureData}
        currentPlayer={currentPlayer}
        loadingText={loadingText}
        progress={(100 * (roomData.currentRound + 1)) / (roomData.maxRounds + 1)}
      />
      <div className="mb-16 mt-32 p-4">
        <Stories dungeonData={adventureData} roomData={roomData} lastStory={lastStory} />
      </div>
    </div>
  );
};
export default MobileStory;
